import React, { memo } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { WorkDetails } from '../../../redux/books';
import { useGetLoveSubjectsQuery } from '../../../services';
import { MonoText, Text, View } from '../../atoms';
import { SCREEN_WIDTH } from '../../../utils';
import { useCallback } from 'react';

type BookListProps = {
  onPressItem: (item: WorkDetails) => void;
};

export default memo(function BookList(props: BookListProps) {
  const { onPressItem } = props;
  const { data } = useGetLoveSubjectsQuery();

  const renderItem = useCallback(
    ({ item }: { item: WorkDetails }) => {
      return (
        <View style={styles.itemContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Title</Text>
            <MonoText style={styles.textContent}>{item.title}</MonoText>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Author</Text>
            <MonoText style={styles.textContent}>{item.authors[0].name}</MonoText>
          </View>
          <View>
            <Text style={styles.textHeader}>Edition Number</Text>
            <MonoText style={styles.textContent}>{item.edition_count}</MonoText>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Click Here to Book!" onPress={() => onPressItem(item)} />
          </View>
        </View>
      );
    },
    [onPressItem]
  );

  return (
    <FlatList data={data?.works} renderItem={renderItem} keyExtractor={(item) => item.title} />
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderRadius: SCREEN_WIDTH * 0.05,
    marginBottom: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.05,
    marginHorizontal: SCREEN_WIDTH * 0.02,
  },
  textContainer: {
    marginBottom: 30,
  },
  textHeader: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: '700',
  },
  textContent: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '300',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
