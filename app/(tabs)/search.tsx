import {ActivityIndicator, FlatList, View, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import useFetch from "@/services/useFetch";
import MovieCard from "@/app/components/movieCard";
import fetchMovies from "@/services/api";
import Searchbar from "@/app/components/searchbar";

const Search = () => {
    const {data: movies, loading: moviesLoading, error: moviesError, refetch : loadMovies ,reset} = useFetch(() => fetchMovies({
        query: searchQuery
    }), false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();

            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);
    return (
        <View className="flex-1 bg-primary">
            {
                (
                    <View className="flex-1 mt-5  px-5">
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
                                      ListEmptyComponent = {
                                          !moviesLoading && !moviesError ? (
                                              <View className="mt-10 px-5 mb-5">
                                                  <Text className="text-center text-gray-500">
                                                      {searchQuery.trim()
                                                          ? "No movies found"
                                                          : "Start typing to search for movies"}
                                                  </Text>
                                              </View>
                                          ) : null

                                      }
                                      contentContainerStyle={{paddingBottom: 100}}
                                      keyExtractor={(item) => item.id}
                                      className="mt-2 pb-32"
                                      scrollEnabled={true}
                                      ListHeaderComponent={
                                          <>
                                              <View className="mt-20 mb-10 justify-center">
                                                  <Searchbar
                                                      value={searchQuery}
                                                      onChangeText={handleSearch}
                                                      placeHolder="Search"/>
                                              </View>
                                              {moviesLoading && (
                                                  <ActivityIndicator
                                                      size="large"
                                                      color="#0000ff"
                                                      className="my-3"
                                                  />)}
                                              {moviesError && (
                                                  <Text className="text-red-500 px-5 my-3">
                                                      Error: {moviesError.message}
                                                  </Text>
                                              )}
                                              {!moviesLoading &&
                                                  !moviesError &&
                                                  searchQuery.trim() &&
                                                  movies?.length! > 0 && (
                                                      <Text className="text-xl text-white font-bold mb-5">
                                                          Search Results for{" "}
                                                          <Text className="text-accent">{searchQuery}</Text>
                                                      </Text>
                                                  )}
                                          </>
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
