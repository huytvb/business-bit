import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import SettingsComponent from '../../components/SettingsComponent';

const Settings = () => {
  const [email, setEmail] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(null);

  const saveSetting = (key, value) => {
    AsyncStorage.setItem(key, value);
  };

  const settingsOptions = [
    {
      title: 'Thông tin của bạn',
      subTitle: 'Thiết lập hồ sơ của bạn',
      onPress: () => {},
    },
    {title: 'Tài khoản', subTitle: null, onPress: () => {}},
    {
      title: 'Tài khoản mặc định',
      subTitle: email,
      onPress: () => {},
    },
    {
      title: 'Hiển thị liên lạc',
      subTitle: 'Tất cả liên lạc',
      onPress: () => {},
    },
    {
      title: 'Sắp xếp',
      subTitle: sortBy,
      onPress: () => {
        setModalVisible(true);
      },
    },
    {title: 'Định dạng tên', subTitle: 'Họ và tên', onPress: () => {}},
    {title: 'Import', subTitle: null, onPress: () => {}},
    {title: 'Export', subTitle: null, onPress: () => {}},
    {title: 'Liên lạc bị khoá', subTitle: null, onPress: () => {}},
    {title: 'Thông tin của danh bạ', subTitle: null, onPress: () => {}},
  ];

  const prefArr = [
    {
      name: 'Họ',
      selected: sortBy === 'Họ',

      onPress: () => {
        saveSetting('sortBy', 'Họ');
        setSortBy('Họ');
        setModalVisible(false);
      },
    },
    {
      name: 'Tên',
      selected: sortBy === 'Tên',
      onPress: () => {
        saveSetting('sortBy', 'Tên');
        setSortBy('Tên');
        setModalVisible(false);
      },
    },
  ];

  const getSettings = async () => {
    const user = await AsyncStorage.getItem('user');
    setEmail(JSON.parse(user).email);

    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };
  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      settingsOptions={settingsOptions}
      prefArr={prefArr}
    />
  );
};

export default Settings;
