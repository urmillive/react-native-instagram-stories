import React, { FC, memo } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import StoryAnimation from '../Animation';
import ListStyles from './List.styles';
import StoryImage from '../Image';
import Progress from '../Progress';
import StoryHeader from '../Header';
import { StoryListProps } from '../../core/dto/componentsDTO';
import { HEIGHT, WIDTH } from '../../core/constants';
import StoryContent from '../Content';

const StoryList: FC<StoryListProps> = ( {
  id, stories, index, x, activeUser, activeStory, progress, onLoad, ...props
} ) => {

  const imageHeight = useSharedValue( HEIGHT );
  const isActive = useDerivedValue( () => activeUser.value === id );

  const activeStoryIndex = useDerivedValue(
    () => stories.findIndex( ( item ) => item.id === activeStory.value ),
  );

  const animatedStyles = useAnimatedStyle( () => (
    { width: WIDTH, maxHeight: imageHeight.value }
  ) );

  const onImageLayout = ( height: number ) => {

    imageHeight.value = height;

  };

  const onImageLoad = () => {

    if ( isActive.value ) {

      onLoad();

    }

  };

  return (
    <StoryAnimation x={x} index={index}>
      <Animated.View style={[ animatedStyles, ListStyles.container ]}>
        <StoryImage
          stories={stories}
          active={isActive}
          activeStory={activeStory}
          onImageLayout={onImageLayout}
          onLoad={onImageLoad}
        />
        <Progress
          active={isActive}
          activeStory={activeStoryIndex}
          progress={progress}
          length={stories.length}
        />
        <StoryHeader {...props} />
        <StoryContent stories={stories} active={isActive} activeStory={activeStory} />
      </Animated.View>
    </StoryAnimation>
  );

};

export default memo( StoryList );