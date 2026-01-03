import React from 'react';
import { StyleSheet, View, Text, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCcw } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useTasbihStore } from '../store/tasbihStore';
import { TasbihCounter } from '../components/TasbihCounter';
import { DzikirSelector } from '../components/DzikirSelector';

export const Home: React.FC = () => {
    const { reset } = useTasbihStore();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Digital Tasbih Pro</Text>
                <Pressable onPress={reset} style={styles.iconButton} hitSlop={20}>
                    <RefreshCcw size={22} color={colors.textSecondary} />
                </Pressable>
            </View>

            <View style={styles.mainContent}>
                <TasbihCounter />
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <DzikirSelector />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: 0.5,
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: colors.surface,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSection: {
        paddingBottom: 20,
    },
});
