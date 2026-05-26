import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackChip} from '../widgets/BackChip';
import {ModalCard} from '../widgets/ModalCard';
import {PrimaryAction} from '../widgets/PrimaryAction';
import {FadeInView} from '../widgets/FadeInView';
import {palette} from '../core/palette';
import {rounding} from '../core/layout';
import {typography} from '../core/typography';
import {useGameScore} from '../state/GameScoreContext';
import {RootStackParams} from '../routing/RouteTypes';

type Nav = NativeStackNavigationProp<RootStackParams, 'RanchSprintPlay'>;

const {width: SW, height: SH} = Dimensions.get('window');
const ARENA_WIDTH = SW;
const ARENA_HEIGHT = Math.min(SH * 0.62, 540);
const BULL_SIZE = 72;
const PICKUP_SIZE = 44;
const LANES = 5;
const LANE_WIDTH = ARENA_WIDTH / LANES;
const HIT_RADIUS = 38;

const MAX_LEVEL = 30;
const POINTS_PER_LEVEL = 25;
const BASE_SPEED = 3.2;
const SPEED_PER_LEVEL = 0.12;
const BASE_SPAWN_PROB = 0.045;
const SPAWN_PER_LEVEL = 0.0017;
const TICK_MS = 16;

const computeLevel = (score: number) =>
  Math.min(MAX_LEVEL, Math.floor(score / POINTS_PER_LEVEL) + 1);
const speedForLevel = (level: number) =>
  BASE_SPEED + (level - 1) * SPEED_PER_LEVEL;
const spawnProbForLevel = (level: number) =>
  Math.min(0.16, BASE_SPAWN_PROB + (level - 1) * SPAWN_PER_LEVEL);

type Pickup = {
  id: number;
  kind:
    | {emoji: string; pts: number; isImage?: false}
    | {image: any; pts: number; isImage: true};
  laneIndex: number;
  y: number;
};

const POSITIVE_KIND: Pickup['kind'][] = [
  {image: require('../assets/game/hay.png'), pts: 10, isImage: true},
  {emoji: '🍎', pts: 5},
  {emoji: '🥕', pts: 8},
  {emoji: '💧', pts: 12},
];

const NEGATIVE_KIND: Pickup['kind'][] = [
  {emoji: '🪨', pts: -20},
  {emoji: '🌵', pts: -15},
  {emoji: '🐍', pts: -10},
];

export const RanchSprintPlayPanel: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {best, submit} = useGameScore();
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);

  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [level, setLevel] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [lane, setLane] = useState(2);
  const [, forceRender] = useState(0);

  const pickupsRef = useRef<Pickup[]>([]);
  const idRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const overRef = useRef(false);
  const pausedRef = useRef(false);
  const laneRef = useRef(2);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);

  useEffect(() => {
    laneRef.current = lane;
  }, [lane]);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const stopAll = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (secondsRef.current) {
      clearInterval(secondsRef.current);
      secondsRef.current = null;
    }
  };

  const finish = () => {
    if (overRef.current) {
      return;
    }
    overRef.current = true;
    stopAll();
    submit(scoreRef.current);
    setOver(true);
  };

  const startGame = () => {
    stopAll();
    pickupsRef.current = [];
    idRef.current = 0;
    overRef.current = false;
    pausedRef.current = false;
    laneRef.current = 2;
    scoreRef.current = 0;
    levelRef.current = 1;

    setScore(0);
    setHearts(3);
    setLevel(1);
    setSecondsLeft(60);
    setLane(2);
    setOver(false);
    setStarted(true);
    setPaused(false);
    forceRender(v => v + 1);

    tickRef.current = setInterval(() => {
      if (overRef.current || pausedRef.current) {
        return;
      }
      const lvl = levelRef.current;
      const speed = speedForLevel(lvl);
      const spawnProb = spawnProbForLevel(lvl);

      const list = pickupsRef.current;
      for (const p of list) {
        p.y += speed;
      }

      if (Math.random() < spawnProb) {
        const isPositive = Math.random() < 0.62;
        const pool = isPositive ? POSITIVE_KIND : NEGATIVE_KIND;
        const kind = pool[Math.floor(Math.random() * pool.length)];
        const laneIndex = Math.floor(Math.random() * LANES);
        idRef.current += 1;
        list.push({
          id: idRef.current,
          kind,
          laneIndex,
          y: -PICKUP_SIZE,
        });
      }

      const bullCenter = laneRef.current * LANE_WIDTH + LANE_WIDTH / 2;
      const bullY = ARENA_HEIGHT - BULL_SIZE - 14;
      let scoreDelta = 0;
      let hitDelta = 0;
      const survivors: Pickup[] = [];

      for (const p of list) {
        if (p.y >= ARENA_HEIGHT) {
          continue;
        }
        const px = p.laneIndex * LANE_WIDTH + LANE_WIDTH / 2;
        const collidesY = p.y + PICKUP_SIZE > bullY;
        const collidesX = Math.abs(px - bullCenter) < HIT_RADIUS;
        if (collidesY && collidesX) {
          scoreDelta += p.kind.pts;
          if (p.kind.pts < 0) {
            hitDelta += 1;
          }
        } else {
          survivors.push(p);
        }
      }

      pickupsRef.current = survivors;

      if (scoreDelta !== 0) {
        const nextScore = Math.max(0, scoreRef.current + scoreDelta);
        scoreRef.current = nextScore;
        setScore(nextScore);
        const nextLevel = computeLevel(nextScore);
        if (nextLevel !== levelRef.current) {
          levelRef.current = nextLevel;
          setLevel(nextLevel);
          if (nextLevel >= MAX_LEVEL) {
            setTimeout(finish, 0);
          }
        }
      }
      if (hitDelta > 0) {
        setHearts(h => {
          const next = Math.max(0, h - hitDelta);
          if (next <= 0) {
            setTimeout(finish, 0);
          }
          return next;
        });
      }

      forceRender(v => (v + 1) % 1000000);
    }, TICK_MS);

    secondsRef.current = setInterval(() => {
      if (overRef.current || pausedRef.current) {
        return;
      }
      setSecondsLeft(s => {
        if (s <= 1) {
          setTimeout(finish, 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, []);

  const handlePauseToggle = () => {
    if (over) {
      return;
    }
    setPaused(p => !p);
  };

  const moveLeft = () => {
    if (paused || over) {
      return;
    }
    setLane(l => Math.max(0, l - 1));
  };
  const moveRight = () => {
    if (paused || over) {
      return;
    }
    setLane(l => Math.min(LANES - 1, l + 1));
  };

  return (
    <ImageBackground
      source={require('../assets/game/play_scene.png')}
      style={styles.root}
      resizeMode="cover">
      <View style={styles.dim} />
      <SafeAreaView style={{flex: 1}}>
        <FadeInView>
          <View style={styles.headerRow}>
            <BackChip onPress={() => navigation.goBack()} />
            <View style={styles.statsRow}>
              <View style={styles.heartsRow}>
                {Array.from({length: 3}).map((_, i) => (
                  <Text key={i} style={styles.heart}>
                    {i < hearts ? '❤️' : '🤍'}
                  </Text>
                ))}
              </View>
              <View style={styles.levelChip}>
                <Text style={styles.levelLabel}>LVL</Text>
                <Text style={styles.levelValue}>{level}</Text>
              </View>
              <View style={styles.timer}>
                <Text style={styles.timerIcon}>⏱</Text>
                <Text style={styles.timerText}>{secondsLeft}s</Text>
              </View>
              <View style={styles.scoreChip}>
                <Text style={styles.scoreIcon}>🏆</Text>
                <Text style={styles.scoreText}>{score}</Text>
              </View>
              <Pressable
                onPress={handlePauseToggle}
                hitSlop={8}
                style={({pressed}) => [
                  styles.pauseBtn,
                  pressed && {opacity: 0.85},
                ]}>
                <Text style={styles.pauseIcon}>⏸</Text>
              </Pressable>
            </View>
          </View>

          {started ? (
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(100, ((level - 1) / (MAX_LEVEL - 1)) * 100)}%`,
                  },
                ]}
              />
              <Text style={styles.progressLabel}>
                Level {level} / {MAX_LEVEL}
              </Text>
            </View>
          ) : null}

          <View
            style={[styles.arena, {width: ARENA_WIDTH, height: ARENA_HEIGHT}]}>
            {pickupsRef.current.map(p => {
              const left =
                p.laneIndex * LANE_WIDTH + LANE_WIDTH / 2 - PICKUP_SIZE / 2;
              return (
                <View
                  key={p.id}
                  style={[
                    styles.pickup,
                    {left, top: p.y, width: PICKUP_SIZE, height: PICKUP_SIZE},
                  ]}>
                  {p.kind.isImage ? (
                    <Image
                      source={(p.kind as any).image}
                      style={styles.hay}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.pickupEmoji}>
                      {(p.kind as any).emoji}
                    </Text>
                  )}
                </View>
              );
            })}

            {started ? (
              <View
                style={[
                  styles.bullWrap,
                  {
                    left:
                      lane * LANE_WIDTH + LANE_WIDTH / 2 - BULL_SIZE / 2,
                    top: ARENA_HEIGHT - BULL_SIZE - 14,
                    width: BULL_SIZE,
                    height: BULL_SIZE,
                  },
                ]}>
                <Image
                  source={require('../assets/animals/texas_longhorn_bull.png')}
                  style={styles.bullImage}
                  resizeMode="cover"
                />
              </View>
            ) : null}
          </View>

          {!started ? (
            <View style={styles.bottom}>
              <PrimaryAction
                label="Play"
                leading="▶"
                onPress={startGame}
                style={styles.playBtn}
              />
              <Text style={styles.bestText}>🏆 Best score: {best}</Text>
              <Text style={styles.hintText}>
                Reach Level {MAX_LEVEL} to become Ranch Champion
              </Text>
            </View>
          ) : (
            <View style={styles.controlsRow}>
              <Pressable
                onPress={moveLeft}
                hitSlop={12}
                style={({pressed}) => [
                  styles.dirBtn,
                  pressed && styles.dirBtnPressed,
                ]}>
                <Text style={styles.dirText}>◀</Text>
              </Pressable>
              <Pressable
                onPress={moveRight}
                hitSlop={12}
                style={({pressed}) => [
                  styles.dirBtn,
                  pressed && styles.dirBtnPressed,
                ]}>
                <Text style={styles.dirText}>▶</Text>
              </Pressable>
            </View>
          )}
        </FadeInView>
      </SafeAreaView>

      <ModalCard
        visible={paused && !over}
        onClose={() => setPaused(false)}
        title="Paused"
        message={`Level ${level} of ${MAX_LEVEL}. Jump back in whenever you’re ready`}
        secondaryLabel="Leave"
        onSecondary={() => {
          setPaused(false);
          navigation.goBack();
        }}
        primaryLabel="Resume"
        onPrimary={() => setPaused(false)}
      />

      <ModalCard
        visible={over}
        onClose={() => {}}
        title={
          level >= MAX_LEVEL
            ? '🏆 Ranch Champion!'
            : 'Ranch Run Complete'
        }
        message={
          level >= MAX_LEVEL
            ? `Incredible! You reached the top level with ${score} points`
            : `You reached Level ${level} with ${score} points. Try again to climb higher!`
        }
        secondaryLabel="Exit"
        onSecondary={() => navigation.goBack()}
        primaryLabel="Play Again"
        onPrimary={startGame}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.backdropDeep,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 10, 34, 0.35)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  heart: {
    fontSize: 13,
  },
  levelChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounding.pill,
    backgroundColor: 'rgba(8, 10, 34, 0.7)',
    borderWidth: 1,
    borderColor: palette.warn,
  },
  levelLabel: {
    ...typography.caption,
    color: palette.warn,
    fontWeight: '800',
    fontSize: 9,
    letterSpacing: 0.5,
  },
  levelValue: {
    ...typography.caption,
    color: palette.textPrimary,
    fontWeight: '800',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: rounding.pill,
    backgroundColor: 'rgba(8, 10, 34, 0.7)',
    borderWidth: 1,
    borderColor: palette.rim,
  },
  timerIcon: {
    fontSize: 11,
  },
  timerText: {
    ...typography.caption,
    color: palette.textPrimary,
    fontWeight: '800',
  },
  scoreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: rounding.pill,
    backgroundColor: palette.accentSoft,
    borderWidth: 1,
    borderColor: palette.accent,
  },
  scoreIcon: {
    fontSize: 11,
  },
  scoreText: {
    ...typography.caption,
    color: palette.accent,
    fontWeight: '800',
  },
  pauseBtn: {
    width: 34,
    height: 34,
    borderRadius: rounding.md,
    backgroundColor: 'rgba(8,10,34,0.7)',
    borderWidth: 1,
    borderColor: palette.rim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseIcon: {
    color: palette.textPrimary,
    fontSize: 13,
  },
  progressBar: {
    marginHorizontal: 16,
    height: 14,
    borderRadius: rounding.pill,
    backgroundColor: 'rgba(8,10,34,0.55)',
    borderWidth: 1,
    borderColor: palette.rim,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 4,
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: palette.accent,
  },
  progressLabel: {
    ...typography.caption,
    color: palette.textPrimary,
    fontWeight: '800',
    fontSize: 10,
    textAlign: 'center',
  },
  arena: {
    overflow: 'hidden',
  },
  pickup: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hay: {
    width: '100%',
    height: '100%',
  },
  pickupEmoji: {
    fontSize: 30,
  },
  bullWrap: {
    position: 'absolute',
    borderRadius: BULL_SIZE / 2,
    borderWidth: 3,
    borderColor: palette.accent,
    overflow: 'hidden',
    backgroundColor: palette.surface,
    shadowColor: palette.accent,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 0},
    elevation: 10,
  },
  bullImage: {
    width: '100%',
    height: '100%',
  },
  bottom: {
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 10,
  },
  playBtn: {
    width: 220,
  },
  bestText: {
    ...typography.caption,
    color: palette.textPrimary,
    fontWeight: '700',
  },
  hintText: {
    ...typography.caption,
    color: palette.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  dirBtn: {
    width: 100,
    height: 70,
    borderRadius: rounding.lg,
    backgroundColor: 'rgba(30,33,80,0.85)',
    borderWidth: 1,
    borderColor: palette.rimStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dirBtnPressed: {
    opacity: 0.8,
    transform: [{scale: 0.96}],
  },
  dirText: {
    color: palette.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
});
