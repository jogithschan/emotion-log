import React, { useState, useEffect } from 'react';
import { View, Text, PanResponder, StyleSheet, TouchableOpacity } from 'react-native';

import styles from './verticalslider.style'

const VerticalSlider = ({ onChange }) => {
    const [sliderHeight, setSliderHeight] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
  
    useEffect(() => {
      setCurrentStep(0);
    }, []);
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        handleTouch(evt.nativeEvent.locationY);
      },
      onPanResponderMove: (evt, gestureState) => {
        handleTouch(evt.nativeEvent.locationY);
      },
    });
  
    const handleTouch = (locationY) => {
      const totalSteps = 10;
      const stepHeight = sliderHeight / totalSteps;
      const newStep = Math.max(Math.floor((sliderHeight - locationY) / stepHeight), 0);
      setCurrentStep(newStep);
      if (onChange) {
        onChange(totalSteps - newStep);
      }
    };
  
    const renderLabels = () => {
      return Array.from({ length: 11 }, (_, index) => {
        const highlighted = index <= currentStep;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.labelContainer,
              { bottom: (sliderHeight / 10) * index },
              highlighted && styles.highlightedLabel,
            ]}
            onPress={() => setCurrentStep(index)}
          >
            <Text style={[styles.label, highlighted && styles.highlightedLabelText]}>{10 - index}</Text>
          </TouchableOpacity>
        );
      });
    };
  
    return (
      <View
        style={styles.slider}
        onLayout={(event) => setSliderHeight(event.nativeEvent.layout.height)}
        {...panResponder.panHandlers}
      >
        <View style={styles.track} />
        {renderLabels()}
        <View style={[styles.thumb, { bottom: (sliderHeight / 10) * currentStep }]} />
      </View>
    );
  };

export default VerticalSlider;