import { useState } from 'react';

import { Button, StyleSheet, Platform, ScrollView } from 'react-native';
import { MonoText, Text, View } from '../../components';
import { RootStackNavigationProps, RootStackParamList } from '../../navigation';
import { SCREEN_WIDTH, getDate, getTime } from '../../utils';
import RNDateTimePicker, {
  DateTimePickerEvent,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import { useReduxDispatch } from '../../redux';
import { addBookingInformation } from '../../redux/books';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'Modal'>;

export default function ModalScreen() {
  const navigation = useNavigation<RootStackNavigationProps<'Modal'>>();
  const route = useRoute<ModalScreenRouteProp>();
  const dispatch = useReduxDispatch();

  const { authors, edition_count, title } = route.params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidNativeProps['mode']>('date');
  const [show, setShow] = useState(false);

  const onChange = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  const showMode = (currentMode: AndroidNativeProps['mode']) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onPressAddToBooking = () => {
    dispatch(addBookingInformation({ ...route?.params, bookingDate: date.toISOString() }));
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Title:</Text>
            <MonoText style={styles.contentText} testID={'text_title'}>
              {title}
            </MonoText>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Author:</Text>
            <MonoText style={styles.contentText} testID={'text_author'}>
              {authors[0].name}
            </MonoText>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Edition:</Text>
            <MonoText style={styles.contentText} testID={'text_edition'}>
              {edition_count}
            </MonoText>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Selected Date: </Text>
            <MonoText style={styles.contentText} testID={'text_date'}>
              {getDate(date.toISOString())}
            </MonoText>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Select Appointment Date"
              onPress={showDatepicker}
              testID={'button_show_date_picker'}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Selected Time: </Text>
            <MonoText style={styles.contentText} testID={'text_time'}>
              {getTime(date.toISOString())}
            </MonoText>
          </View>
          <Button title="Select Appointment Time" onPress={showTimepicker} />
          {show && (
            <View style={styles.calendarPicker}>
              <RNDateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                display={'default'}
              />
            </View>
          )}
        </View>
        <Button title="Add to Booking List" onPress={onPressAddToBooking} testID={'button_add'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, width: '100%', height: '100%' },
  container: {
    flex: 1,
    padding: SCREEN_WIDTH * 0.05,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: SCREEN_WIDTH * 0.05,
  },
  textContainer: {
    marginBottom: 30,
  },
  calendarPicker: { alignItems: 'center', justifyContent: 'center' },
  buttonContainer: {
    marginBottom: 20,
  },
});
