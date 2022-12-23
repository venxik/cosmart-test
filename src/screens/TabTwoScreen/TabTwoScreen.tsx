import { StyleSheet } from 'react-native';

import { BookedItemList, View } from '../../components';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <BookedItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
