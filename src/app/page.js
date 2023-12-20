"use client"
import { useEffect, useState } from "react"
import Card from "@/components/Card"
import Paginate from "@/components/Paginate"
import style from "./page.module.css"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/config"
import { useRouter } from "next/navigation"
import Search from "@/components/search/Search"
import {URL} from "@/config/apiUrl"
export default function Home() {
  const router = useRouter()
  const [cardPosts, setCardPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [search, setSearch] = useState("")
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = cardPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(cardPosts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getData = async () => {
    try {
      const data = await fetch(URL)
      const resData = await data.json()
      setCardPosts(resData.data)
    } catch (error) {
      
    }
  }
  const handleSearchField = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    getData();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
      }
    });
    
  }, [])


  useEffect(() => {
    if (search !== "") {
      var cardPost = cardPosts.filter((val) => {
        return val.title.toLowerCase().includes(search.toLowerCase());
      })
      setCardPosts(cardPost)
    } else {
      getData();
    }
    return () => { }
  }, [search])
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Search handleSearch={(e) => handleSearchField(e)} val={search} />
            <div className={style.mainContainer}>
              {currentPosts.map((val, index) => {
                return (
                  <div key={index}>
                    <Card title={val.title} id={val.id} image={val.images} />
                  </div>
                )
              })}

            </div>

            <div className="my-4">
              {currentPosts.length !== 0 &&
                <Paginate
                  postsPerPage={postsPerPage}
                  totalPosts={cardPosts.length}
                  currentPage={currentPage}
                  paginate={(pageNumber) => paginate(pageNumber)}
                  previousPage={previousPage}
                  nextPage={nextPage}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
