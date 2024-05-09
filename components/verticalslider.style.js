import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    slider: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    track: {
      position: 'absolute',
      backgroundColor: '#ccc',
      width: 4,
      height: '100%',
      borderRadius: 2,
    },
    thumb: {
      position: 'absolute',
      backgroundColor: 'blue',
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    labelContainer: {
      position: 'absolute',
      width: '100%',
      alignItems: 'flex-start',
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    highlightedLabel: {
      backgroundColor: 'yellow', // Change to your desired highlight color
    },
    highlightedLabelText: {
      color: 'black', // Change to your desired text color for highlighted labels
    },
});

export default styles;