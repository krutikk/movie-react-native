import {ActivityIndicator, FlatList, Text, View} from 'react-native'
import React from 'react'
import useFetch from "@/services/useFetch";
import MovieCard from "@/app/components/movieCard";
import fetchMovies from "@/services/api";
import Searchbar from "@/app/components/searchbar";

const Search = () => {
    const {data: movies, loading: moviesLoading, error: moviesError} = useFetch(() => fetchMovies({
        query: ''
    }));
    return (
        <View className="flex-1 bg-primary">
            {
                moviesLoading ? <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"/> :
                    moviesError ? (
                        <Text>Error {moviesError.message}</Text>
                    ) : (
                        <View className="flex-1 mt-5">
                            <>

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
                                          contentContainerStyle = {{paddingBottom:100}}
                                          keyExtractor={(item) => item.id}
                                          className="mt-2 pb-32"
                                          scrollEnabled={true}
                                          ListHeaderComponent={
                                              <View className="mt-20 justify-center">
                                                  <Searchbar
                                                      placeHolder="Search"/>
                                              </View>
                                          }
                                          renderItem={({item}) => (
                                              <MovieCard id={item.id} title={item.title} adult={false}
                                                         backdrop_path={""} genre_ids={[]} original_language={""}
                                                         original_title={""} overview={""} popularity={0}
                                                         poster_path={item.poster_path} release_date={item.release_date}
                                                         video={false}
                                                         vote_average={item.vote_average} vote_count={item.vote_count}/>
                                          )}/>
                            </>
                        </View>
                    )

            }

        </View>)
}
export default Search
