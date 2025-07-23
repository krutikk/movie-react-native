import {Text, View, Image, Animated, ActivityIndicator, FlatList} from "react-native";
import "../global.css"
import {Link} from "expo-router";
import {images} from "@/constants/images";
import ScrollView = Animated.ScrollView;
import {icons} from "@/constants/icons";
import Searchbar from "@/app/components/searchbar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/app/components/movieCard";


export default function Index() {
    const router = useRouter();
    const {data: movies, loading: moviesLoading, error: moviesError} = useFetch(() => fetchMovies({
        query: ''
    }));
    return (
        <View className="flex-1 bg-primary">

            <Image source={
                images.bg
            } className="absolute w-full z-0"/>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={
                {minHeight: "100%", paddingBottom: 10}
            }>
                <Image source={icons.logo} className="w-12 mt-20 mb-5 mx-auto"/>

                {
                    moviesLoading ? <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"/> :
                        moviesError ? (
                            <Text>Error {moviesError.message}</Text>
                        ) : (
                            <View className="flex-1 mt-5">

                                <Searchbar placeHolder="Search" onPress={() => {
                                    router.push("/search");
                                }}/>
                                <>
                                    <Text className="text-white text-lg font-bold mt-5 mb-3">Latest movies</Text>
                                    <FlatList data={movies}
                                              numColumns={3}
                                              columnWrapperStyle={
                                                  {
                                                      justifyContent: 'flex-start',
                                                      gap: 20,
                                                      paddingRight: 5,
                                                      marginBottom: 10
                                                  }
                                              }
                                              keyExtractor={(item) => item.id}
                                              className="mt-2 pb-32"
                                              scrollEnabled={false}
                                              renderItem={({item}) => (
                                                  <MovieCard id={item.id} title={item.title} adult={false}
                                                             backdrop_path={""} genre_ids={[]} original_language={""}
                                                             original_title={""} overview={""} popularity={0}
                                                             poster_path={item.poster_path} release_date={item.release_date} video={false}
                                                             vote_average={item.vote_average} vote_count={item.vote_count}/>
                                              )}/>
                                </>
                            </View>
                        )

                }
            </ScrollView>
        </View>
    );
}
