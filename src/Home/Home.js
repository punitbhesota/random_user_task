import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, StyledTableCell, StyledTableRow } from "../Utils";
import { GetUserList } from "../actions";
import Download from "../Components/Download";
import styles from "./Home.module.css";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

const Home = () => {
  const users = useSelector((state) => state.userList.users);
  const hasMore = useSelector((state) => state.userList.hasMore);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sorttype, setSorttype] = useState("");
  const [subsorttype, setSubsorttype] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUserList(1));
    setPage((prevState) => prevState + 1);
  }, [dispatch]);

  const fetchUsers = () => {
    setPage((prevState) => prevState + 1);
    setTimeout(() => {
      if (hasMore) {
        dispatch(GetUserList(page));
      }
    }, 0);
  };

  return (
    <div className={styles.home}>
      <h1 style={{ textAlign: "center" }}>TopHat : Machine Task</h1>
      <div className={styles.headbar}>
        <div className={styles.search}>
          <input
            placeholder="Search name or email"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.buttons}>
          <div className={styles.button}>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                Filter by : {filter}&nbsp;&nbsp;
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li
                  onClick={() => {
                    setQuery("male");
                    setFilter("male");
                  }}
                >
                  Gender - Male
                </li>

                <li
                  onClick={() => {
                    setQuery("female");
                    setFilter("female");
                  }}
                >
                  Gender - Female
                </li>
                <li
                  onClick={() => {
                    setQuery("");
                    setFilter("");
                  }}
                >
                  Default
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.button}>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                Sort by : {sort}&nbsp;&nbsp;
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li
                  onClick={() => {
                    setSort("Name");
                    setSorttype("name");
                    setSubsorttype("first");
                  }}
                >
                  Name
                </li>
                <li
                  onClick={() => {
                    setSort("Email");
                    setSorttype("email");
                    setSubsorttype("");
                  }}
                >
                  Email
                </li>
                <li
                  onClick={() => {
                    setSort("Age");
                    setSorttype("dob");
                    setSubsorttype("age");
                  }}
                >
                  Age
                </li>
                <li
                  onClick={() => {
                    setSort("");
                    setSorttype("");
                    setSubsorttype("");
                  }}
                >
                  Default
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.button}>
            <Download />
          </div>
        </div>
      </div>
      <Paper className={styles.paper}>
        <TableContainer
          className={styles.container}
          sx={{ borderRadius: 0 }}
          component={Paper}
        >
          <InfiniteScroll
            dataLength={users.length}
            next={fetchUsers}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Picture</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Gender</StyledTableCell>
                  <StyledTableCell align="center">DOB</StyledTableCell>
                  <StyledTableCell align="center">Phone number</StyledTableCell>
                  <StyledTableCell align="center">Age</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  ?.filter(
                    (user) =>
                      user?.name?.first
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      user?.name?.last
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      user?.email.toLowerCase().includes(query.toLowerCase()) ||
                      user?.gender.toLowerCase().startsWith(query.toLowerCase())
                  )

                  .sort((a, b) => {
                    if (sorttype && subsorttype) {
                      return a[sorttype][subsorttype] > b[sorttype][subsorttype]
                        ? 1
                        : -1;
                    } else if (sorttype && !subsorttype) {
                      return a[sorttype] > b[sorttype] ? 1 : -1;
                    }

                    return a.blah > b.blah ? 1 : -1;
                  })

                  .map((user, row) => (
                    <StyledTableRow
                      key={row}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Avatar
                            style={{
                              width: "40px",
                              height: "40px",
                              marginRight: "10px",
                            }}
                            src={user?.picture?.medium}
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.name?.title}. {user?.name?.first}{" "}
                        {user?.name?.last}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {user?.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.gender}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formatDate(user?.dob?.date)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user?.phone}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {user?.dob?.age}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Home;
