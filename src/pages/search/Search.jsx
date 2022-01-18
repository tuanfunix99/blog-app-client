import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Posts from "../../components/posts/Posts";
import TopBar from "../../components/topbar/TopBar";
import { GET_SEARCH } from "../../graphql/query/post";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { searchState } from "../../state/post";
import { useRecoilState } from "recoil";

import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useRecoilState(searchState);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loadPage, setLoadPage] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const { data } = useQuery(GET_SEARCH, {
    variables: {
      input: {
        page: page,
        perPage: 6,
        title: searchParams.get("title").trim(),
      },
    },
    onError() {
      navigate("/not-found");
    },
  });

  useEffect(() => {
    if (data) {
      if (data.search.posts.length === 0) {
        setLoadPage(false);
        setSearch([]);
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setLoadPage(false);
        setSearch(data.search.posts);
        setCount(data.search.count);
      }
    }
  }, [data]);

  const onChangePagination = (e, value) => {
    setPage(value);
    setLoadPage(true);
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <TopBar />
      {search.length > 0 && !loadPage && (
        <div>
          <Posts posts={search} />
        </div>
      )}
      {search.length === 0 && !isEmpty  && <Loading />}
      {loadPage && !isEmpty && <Loading color={"#36D7B7"} loading={true} size={40} />}
      {search.length > 0 && !loadPage && (
        <div className="pagination-bar">
          <Pagination
            count={count}
            page={page}
            onChange={onChangePagination}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
      {isEmpty && (
        <Container>
          <Row>
            <Col lg={12}>
              <Alert variant="info">
                <Alert.Heading>No Resuls</Alert.Heading>
                <p>
                  0 results with title={searchParams.get("title").trim()}
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      )}
      <Stack spacing={2}></Stack>
      <Footer />
    </Fragment>
  );
};

export default Search;