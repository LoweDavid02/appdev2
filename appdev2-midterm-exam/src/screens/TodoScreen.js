import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const COLORS = {
  purple: '#6C63FF',
  yellow: '#F5C518',
  white: '#FFFFFF',
  bg: '#F2F2F7',
  textPrimary: '#1A1A2E',
  textSecondary: '#8E8E9A',
  textMuted: '#BDBDCA',
  danger: '#E05252',
  checkActive: '#6C63FF',
  checkBorder: '#D0D0DC',
  divider: '#F0F0F5',
  inputBg: '#EFEFEF',
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const TrashIcon = () => (
  <View style={{ width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{
      width: 16, height: 2.5, backgroundColor: COLORS.danger,
      borderRadius: 2, marginBottom: 2,
    }} />
    <View style={{
      width: 13, height: 13, backgroundColor: COLORS.danger,
      borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
      alignItems: 'center', justifyContent: 'space-evenly',
      flexDirection: 'row', paddingHorizontal: 2,
    }}>
      {[0, 1, 2].map(i => (
        <View key={i} style={{
          width: 2, height: 7,
          backgroundColor: 'rgba(255,255,255,0.55)',
          borderRadius: 1,
        }} />
      ))}
    </View>
  </View>
);

const TodoItem = ({ item, onToggle, onDelete, isLast }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, tension: 90, friction: 11, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: -6, duration: 180, useNativeDriver: true }),
    ]).start(() => onDelete(item.id));
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <View style={[styles.todoRow, !isLast && styles.todoRowBorder]}>
        <TouchableOpacity
          onPress={() => onToggle(item.id)}
          style={[styles.checkbox, item.completed && styles.checkboxActive]}
          activeOpacity={0.7}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <Text
          style={[styles.todoText, item.completed && styles.todoTextDone]}
          numberOfLines={2}
        >
          {item.text}
        </Text>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn} activeOpacity={0.6}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default function TodoScreen() {
  const [todos, setTodos] = useState([
    { id: generateId(), text: 'Learn react native flexbox', completed: true },
    { id: generateId(), text: 'Create todo app', completed: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');

  const filtered = todos.filter(t =>
    t.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setTodos(prev => [...prev, { id: generateId(), text: trimmed, completed: false }]);
    setInputText('');
  };

  const handleToggle = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.purple} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Purple Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchEmoji}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search todos..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* White rounded card */}
        <View style={styles.card}>
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TodoItem
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
                isLast={index === filtered.length - 1}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📋</Text>
                <Text style={styles.emptyText}>
                  {searchText
                    ? `No results for "${searchText}"`
                    : 'No tasks yet.\nAdd one below!'}
                </Text>
              </View>
            }
          />
        </View>

        {/* Bottom Add Bar */}
        <View style={styles.addBar}>
          <TextInput
            style={styles.addInput}
            placeholder="Add a new task"
            placeholderTextColor={COLORS.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[styles.addBtn, !inputText.trim() && styles.addBtnDisabled]}
            onPress={handleAdd}
            activeOpacity={0.85}
            disabled={!inputText.trim()}
          >
            <Text style={styles.addBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.purple,
  },
  flex: {
    flex: 1,
  },

  // Header
  header: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 28,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchEmoji: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  clearText: {
    color: COLORS.textMuted,
    fontSize: 13,
    paddingLeft: 8,
  },

  // Card
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  listContent: {
    paddingTop: 6,
    paddingBottom: 12,
    flexGrow: 1,
  },

  // Todo Row
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  todoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: COLORS.checkBorder,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkboxActive: {
    backgroundColor: COLORS.checkActive,
    borderColor: COLORS.checkActive,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
    fontWeight: '400',
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 8,
  },

  // Empty
  emptyState: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 14,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Add Bar
  addBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    gap: 12,
  },
  addInput: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.yellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 5,
  },
  addBtnDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  addBtnText: {
    fontSize: 30,
    fontWeight: '300',
    color: COLORS.white,
    lineHeight: 34,
  },
});
