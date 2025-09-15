import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  require("../assets/banner1.jpeg"),
  require("../assets/banner2.jpeg"),
  require("../assets/banner3.jpeg"),
];

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      setActiveIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={{ marginVertical: 12 }}>
      <FlatList
        data={banners}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        renderItem={({ item }) => (
          <View style={styles.bannerWrapper}>
            <Image source={item} style={styles.banner} />
          </View>
        )}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, { opacity: i === activeIndex ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  bannerWrapper: {
    width: width - 20, // smaller than screen width to show border radius
    height: 225,
    borderRadius: 12,
    marginHorizontal: 0,
    marginRight: 5,

    overflow: "hidden", // makes border radius visible
  },
  banner: {
    width: "100%",
    height: "100%",
    marginRight: 5,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#042048",
    marginHorizontal: 4,
  },
});
