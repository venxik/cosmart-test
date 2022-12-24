import React, { memo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { BookingInformation } from '../../../redux/books';
import { MonoText, Text, View } from '../../atoms';
import { SCREEN_WIDTH, getDate, getTime } from '../../../utils';
import { useReduxSelector } from '../../../redux';

export default memo(function BookedItemList() {
  const { bookingInformation } = useReduxSelector((s) => s.books);

  const renderItem = ({ item }: { item: BookingInformation }) => {
    return (
      <View style={styles.itemContainer} testID={'booking_item_list'}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>Title</Text>
          <MonoText style={styles.textContent}>{item.title}</MonoText>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>Author</Text>
          <MonoText style={styles.textContent}>{item.authors[0].name}</MonoText>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>Edition Number</Text>
          <MonoText style={styles.textContent}>{item.edition_count}</MonoText>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>Booking Date</Text>
          <MonoText style={styles.textContent}>{getDate(item.bookingDate)}</MonoText>
        </View>
        <View>
          <Text style={styles.textHeader}>Booking Time</Text>
          <MonoText style={styles.textContent}>{getTime(item.bookingDate)}</MonoText>
        </View>
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer} testID={'empty_container'}>
        <Text style={styles.textHeader}>Booking List is Empty</Text>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.flatlistContainer}
      data={bookingInformation}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      ListEmptyComponent={renderEmpty}
    />
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
  flatlistContainer: { flexGrow: 1 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
