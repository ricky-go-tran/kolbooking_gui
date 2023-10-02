import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";
import PageTitle from "../../components/admin/typography/PageTitle";
import { LockIcon } from "../../icons";
import { ITableBookmark } from "../../global_variable/global_table_admin";
import axios from "axios";
import { getProxy } from "../../utils/PathUtil";
import { fetchToITableBookmark } from "../../utils/FetchDataTable";
import { Alert } from "@windmill/react-ui";
import { HandleResponseError } from "../../utils/ErrorHandleUtil";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const { state: auth_state } = useContext(AuthContext);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState<ITableBookmark[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [alert, setAlert] = useState("");
  const [resultsPerPage, setResultPerPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/bookmarks"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        let handle_data = fetchToITableBookmark(response.data.data);
        let meta = response.data.meta;
        setResultPerPage(meta.items);
        setTotalResults(meta.count);
        setDataTable(handle_data);
      })
      .catch((error) => {
        console.log(error);
        // HandleResponseError(error, navigate)
      });
  }, []);

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/bookmarks"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
        params: {
          page: {
            number: pageTable,
          },
        },
      })
      .then((response) => {
        let handle_data = fetchToITableBookmark(response.data.data);
        let meta = response.data.meta;
        setResultPerPage(meta.items);
        setTotalResults(meta.count);
        setDataTable(handle_data);
      })
      .catch((error) => {
        console.log(error);
        // HandleResponseError(error, navigate)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable]);

  return (
    <>
      <PageTitle>BookMarks</PageTitle>
      {alert !== "" && (
        <Alert
          type="danger"
          className="my-5"
          onClose={() => {
            setAlert("");
          }}
        >
          {alert}
        </Alert>
      )}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Job</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((bookmark, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={bookmark.image_job}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{bookmark.name_job}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge type={bookmark.status_color}>{bookmark.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(bookmark.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit">
                      <LockIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Bookmark;
