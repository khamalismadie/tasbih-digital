import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { ProgressRing } from './ProgressRing';
import { useTasbihStore } from '../store/tasbihStore';

export const TasbihCounter: React.FC = () => {
    const { count, target, increment } = useTasbihStore();

    // Calculate progress. If target is 0 (infinite), progress is 0 or 1?
    // Let's assume infinite mode doesn't show ring progress or always full.
    // For standard mode:
    const progress = target > 0 ? (count % target) / target : 0;
    // Note: (count % target) means it loops.
    // Or should it fill up and stop? "Multi-target sequence" implies looping or flow.
    // Spec says "Progress ring animation". Usually tasbih resets or loops.
    // Let's use (count % target) / target if count < target?
    // If I have count=1, target=33. Progress = 1/33.
    // If count=33, progress=1. Next tap count=34.
    // Usually digital tasbih tracks total count, but the "round" is 33.
    // So progress should be `(count % target) / target`. 
    // Wait, if count=33, 33%33 = 0. We want it to look full at 33.
    // So: `(count % target === 0 && count > 0) ? 1 : (count % target) / target`.

    const displayProgress = target > 0
        ? (count > 0 && count % target === 0 ? 1 : (count % target) / target)
        : 0;

    const handlePress = () => {
        increment();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Check if we hit the target
        if (target > 0 && (count + 1) % target === 0) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <View style={styles.ringContainer}>
                <ProgressRing progress={displayProgress} size={320} strokeWidth={20} />
                <View style={styles.contentContainer}>
                    <Text style={styles.countText}>{count}</Text>
                    <Text style={styles.targetText}>{target > 0 ? `Target: ${target}` : 'No Target'}</Text>
                </View>
            </View>
            <Text style={styles.hintText}>Tap to Count</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    ringContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 72,
        fontWeight: '700',
        color: colors.text,
        fontVariant: ['tabular-nums'],
    },
    targetText: {
        fontSize: 18,
        color: colors.textSecondary,
        marginTop: 8,
    },
    hintText: {
        marginTop: 40,
        color: colors.textSecondary,
        fontSize: 14,
        opacity: 0.6,
    },
});
