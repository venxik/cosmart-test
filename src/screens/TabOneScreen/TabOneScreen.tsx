import { StyleSheet } from 'react-native';

import { View, BookList } from '../../components';
import { RootTabNavigationProps } from '../../navigation';
import { useCallback } from 'react';
import { WorkDetails } from '../../redux/books';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const { navigate } = useNavigation<RootTabNavigationProps<'TabOne'>>();
  const onPressItem = useCallback(
    (item: WorkDetails) => {
      navigate('Modal', item);
    },
    [navigate]
  );

  return (
    <View style={styles.container}>
      <BookList onPressItem={onPressItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
