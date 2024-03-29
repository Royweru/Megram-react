import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

import { GridPostList } from '@/components/shared/grid-post-list'
import { SearchResults } from '@/components/shared/search-results'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import useDebounce from '@/hooks/useDebounce'
import { Loader2 } from 'lucide-react'
export const Explore = () => {
  const {data:posts,fetchNextPage,hasNextPage} = useGetPosts()
  const[searchValue,setSearchValue] = useState('')

  if(!posts){
    return(
      <div className=' flex-center w-full h-full'>
        <Loader2 className=' w-10 h-10 animate-spin' />
      </div>
    )
  }
  const shouldShowSearchResults = searchValue!==''
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item)=>item?.documents.length===0)
  const debouncedValue = useDebounce(searchValue,500)
  const {data:searchedPosts,isFetching:isSearchFetching}=useSearchPosts(searchValue)

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className=' flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img 
          src="/assets/icons/search.svg"
           width={24}
           height={24}
          alt="search" 
          />
          <Input
            type='text'
            placeholder='search'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            className='explore-search'
            />
        </div>
      </div>
      
      <div className=' flex-between w-full max-w-5xl mt-16 mb-7'>
      <h3 className='md:h3-bold body-bold w-full'>Popualar Today</h3>
      <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className=' small-medium md:base-medium text-light-2'>
                 ALL
          </p>
          <img src="/assets/icons/filter.svg" 
           height={20}
           width={20}
          alt="filter" />
      </div>
      </div>
      <div className=' flex flex-wrap gap-9 w-full max-w-5xl'>
      {shouldShowSearchResults ? (
          <SearchResults
    
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
      </div>
  )
}
