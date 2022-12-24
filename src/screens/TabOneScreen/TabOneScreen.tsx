import { StyleSheet } from 'react-native';

import { View, BookList } from '../../components';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <BookList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
