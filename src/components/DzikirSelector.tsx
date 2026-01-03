import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { useTasbihStore } from '../store/tasbihStore';

const PRESETS = ['Subhanallah', 'Alhamdulillah', 'Allahu Akbar', 'Astaghfirullah', 'Shalawat'];

export const DzikirSelector: React.FC = () => {
    const { dzikirName, setDzikirName } = useTasbihStore();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Active Dzikir</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {PRESETS.map((item) => (
                    <Pressable
                        key={item}
                        style={[styles.chip, dzikirName === item && styles.activeChip]}
                        onPress={() => setDzikirName(item)}
                    >
                        <Text style={[styles.text, dzikirName === item && styles.activeText]}>{item}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        width: '100%',
    },
    label: {
        color: colors.textSecondary,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    scroll: {
        paddingHorizontal: 20,
        gap: 12,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeChip: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    text: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    activeText: {
        color: '#FFFFFF', // Contrast on primary
        fontWeight: '600',
    },
});
