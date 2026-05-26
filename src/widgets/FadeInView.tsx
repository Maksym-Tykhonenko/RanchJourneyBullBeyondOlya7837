import React, {useEffect, useRef} from 'react';
import {Animated, ViewStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  translate?: number;
  style?: ViewStyle;
  flex?: boolean;
};

export const FadeInView: React.FC<Props> = ({
  children,
  duration = 420,
  delay = 0,
  translate = 12,
  style,
  flex = true,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(translate)).current;

  useEffect(() => {
    const composite = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(offset, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);
    composite.start();
    return () => composite.stop();
  }, [opacity, offset, duration, delay]);

  return (
    <Animated.View
      style={[
        flex ? {flex: 1} : null,
        {opacity, transform: [{translateY: offset}]},
        style,
      ]}>
      {children}
    </Animated.View>
  );
};
