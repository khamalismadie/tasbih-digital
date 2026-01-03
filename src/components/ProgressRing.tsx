import React, { useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../theme/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
    size?: number;
    strokeWidth?: number;
    progress: number; // 0 to 1
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
    size = 280,
    strokeWidth = 12,
    progress,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const animatedProgress = useSharedValue(progress);

    useEffect(() => {
        // Clamp progress between 0 and 1
        const clamped = Math.min(Math.max(progress, 0), 1);
        animatedProgress.value = withSpring(clamped, { damping: 15, stiffness: 90 });
    }, [progress]);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference * (1 - animatedProgress.value),
        };
    });

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background Ring */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={colors.ringBackground}
                strokeWidth={strokeWidth}
                fill="transparent"
            />
            {/* Progress Ring */}
            <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={colors.primary}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeLinecap="round"
                animatedProps={animatedProps}
                rotation="-90"
                origin={`${size / 2}, ${size / 2}`}
            />
        </Svg>
    );
};
