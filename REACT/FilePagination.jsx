import React, { useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
import "./filepagination.css";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import fileService from "services/fileService";
import CardTemplate from "./FileCardTemplate";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import swal from "sweetalert";
import { Formik, Form, Field } from "formik";
import SearchSchema from "schemas/filePaginationSchema";
import toastr from "toastr";
import "../../toastr/build/toastr.css";

const _logger = debug.extend("paginate");
function FilePagination(props) {
	let currentUser = props.currentUser;
	// State(s) ---------------------
	const [files, setFileInfo] = useState({
		fileArray: [],
		fileComponents: [],
		isDeleted: false,
		ownedByUser: false,
		fileTypeComponents: [],
		searchBar: "",
		fileType: 0,
        fileId: "",
	});
	const [pageInfo, setPageInfo] = useState({
		pageIndex: 0,
		pageSize: 25,
		fileCount: 1,
		totalpage: 1,
		current: 1,
		searchQuery: "",
		fileType: 0,
        fileId: "",
	});
	useEffect(() => {
		const fileTypeSuccess = (response) => {
			_logger("fileType response ->", response);
			let fileTypes = response.items;
			setFileInfo((prevState) => {
				const pd = { ...prevState };
				pd.fileTypeComponents = fileTypes.map(mapFileTypes);
				return pd;
			});
		};
		const fileTypeError = (response) => {
			_logger("fileType Error response ->", response);
		};
		fileService
			.getListOfFileTypes("FileTypes")
			.then(fileTypeSuccess)
			.catch(fileTypeError);
	}, []);
	useEffect(() => {
		let nameSearch = pageInfo.searchQuery !== "";
		let fileId = pageInfo.fileId !== "";
		let fileTypeSearch = pageInfo.fileType > 0;
		_logger(
			fileTypeSearch,
			pageInfo.fileType,
			nameSearch,
			pageInfo.searchQuery
		);
		const payload = {
			index: pageInfo.pageIndex,
			size: pageInfo.pageSize,
			deleted: files.isDeleted,
			searchQuery: pageInfo.searchQuery,
			fileTypeQuery: pageInfo.fileType,
			fileId: pageInfo.fileId,
		};
		let userOwned = files.ownedByUser;

        if (fileId) {
            fileService
                .getFileById(payload.fileId)
                .then(successFileByID)
				.catch(errorFiles);
        } else if (fileTypeSearch && nameSearch && userOwned) {
			fileService
				.getFilesByTypeAndNameAndCurrentUser(payload)
				.then(successFiles)
				.catch(errorFiles);
		} else if (fileTypeSearch && nameSearch && !userOwned) {
			fileService
				.getFilesByTypeAndName(payload)
				.then(successFiles)
				.catch(errorFiles);
		} else if (fileTypeSearch && !nameSearch && userOwned) {
			fileService
				.getFilesByTypeAndCurrentUser(payload)
				.then(successFiles)
				.catch(errorFiles);
		} else if (fileTypeSearch && !nameSearch && !userOwned) {
			fileService
                .getFilesByType(payload)
                .then(successFiles)
                .catch(errorFiles);
		} else if (!fileTypeSearch && nameSearch && userOwned) {
			fileService
				.getFilesByNameAndUser(payload)
				.then(successFiles)
				.catch(errorFiles);
		} else if (!fileTypeSearch && nameSearch && !userOwned) {
			fileService.getFilesByName(payload)
                .then(successFiles)
                .catch(errorFiles);
		} else if (!fileTypeSearch && !nameSearch && userOwned) {
			fileService
				.getFilesByUser(payload)
				.then(successFiles)
				.catch(errorFiles);
		} else if (!fileTypeSearch && !nameSearch && !userOwned) {
			fileService
				.getFilesByPagination(payload)
				.then(successFiles)
				.catch(errorFiles);
		}
	}, [pageInfo]);
	// Get files (Ajax) ------------
	const successFiles = (response) => {
		_logger("Success response ->", response);
		let fileArray = response.item.pagedItems;
		pageInfo.fileCount = response.item.totalCount;

		setFileInfo((prevState) => {
			const pd = { ...prevState };
			pd.fileArray = fileArray;
			pd.fileComponents = fileArray.map(mapFiles);
			return pd;
		});
	};
    const successFileByID = (response) => {
		_logger("Success response ->", response);
		let fileArray = [response.item];
		pageInfo.fileCount = 1;
		setFileInfo((prevState) => {
			const pd = { ...prevState };
			pd.fileArray = fileArray;
			pd.fileComponents = fileArray.map(mapFiles);
			return pd;
		});
	};
	const errorFiles = (response) => {
		_logger("Error response ->", response);
		setFileInfo((prevState) => {
			const pd = { ...prevState };
			pd.fileComponents = [];
            pd.totalCount = 0;
			return pd;
		});
        toastr.error(response, "Error");
	};
	// Delete and recovery ----------
	const updateFileSuccess = (aFile) => {
		_logger("success", aFile);
		const fileToRemove = aFile.id;
		setFileInfo((prevState) => {
			const pd = { ...prevState };
			pd.fileArray = [...pd.fileArray];
			const idxOfFile = pd.fileArray.findIndex((aFile) => {
				let result = false;
				if (aFile.id === fileToRemove) {
					result = true;
				}
				return result;
			});
			if (idxOfFile >= 0) {
				pd.fileArray.splice(idxOfFile, 1);
				pd.fileComponents = pd.fileComponents = pd.fileArray.map(mapFiles);
			}
			return pd;
		});
	};
	const updateFileError = (response) => {
		_logger("Error", response);
		swal({
			title: "ERROR",
			text: "An error occured and the file was unchanged.",
			icon: "Error",
			button: "Ok",
		});
	};
	const addOrRemoveFromTrash = useCallback((file) => {
		_logger("file to update -->", file);
		let addRemoveTrash = !file.isDeleted;
		let swalRec = "Your file will be recovered.";
		let swalDel = "Your file will be deleted";
		let currentSwal = addRemoveTrash ? swalDel : swalRec;
		let swalRecSuccess = "Your file is recovered.";
		let swalDelSuccess = "Your file is deleted";
		let currentSwalSuccess = addRemoveTrash ? swalDelSuccess : swalRecSuccess;
		swal({
			title: "Are you sure?",
			text: currentSwal,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				updateConfirmed();
				swal(currentSwalSuccess, {
					icon: "success",
				});
			} else {
				swal("The file is the same!");
			}
		});
        const updateConfirmed = () =>{
        const updateModel = {
         name: file.name,
         url: file.url,
         fileType: file.fileType.name,
         isDeleted: addRemoveTrash
        }
         _logger("Update model -->", updateModel)
         fileService.updateFiles(updateModel, file.id)
         .then(updateFileSuccess(file))
         .catch(updateFileError)    
        }
    },[])
    const deleteFile = useCallback((file) =>{
        swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this file!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
         })
        .then((willDelete) => {
         if (willDelete) {
             deleteConfirmed()
             swal("The file will be deleted!", {
             icon: "success",
             });
         } else {
             swal("The file is safe!");
         }
         });
        const deleteConfirmed = () => {
         _logger("file to delete -->", file)
         fileService.deleteFile(file.id)
         .then(updateFileSuccess(file))
         .catch(updateFileError)
        }
    },[])
    // Download Files --------------
    const downloadFile = useCallback((file)=>{
        swal({
         title: "Are you sure?",
         text: "Are you sure you want to download " + file.name,
         icon: "warning",
         buttons: true,
         dangerMode: true,
         })
         .then((willDelete) => {
         if (willDelete) {
             downloadConfirmed()
             swal("Downloading file!", {
             icon: "success",
             });
         } else {
             swal("The file will not be downloaded!");
         }
         });
        const downloadConfirmed = () => {
        _logger("DownloadFile ---->", file)
         fetch(file.url).then(response => {
             response.blob().then(blob => {
                 const fileURL = window.URL.createObjectURL(blob);
                 let alink = document.createElement('a');
                 alink.href = fileURL;
                 alink.download = file.name;
                 alink.click();
             })
         })    
        }   
    },[])
    // Mapping ---------------------
    const mapFiles = (aFile) => {
        return (
            <CardTemplate
            key = {aFile.id}
            file = {aFile}
            trashManagment = {addOrRemoveFromTrash}
            deleteFile = {deleteFile}
            downloadFile = {downloadFile}
            currentRoles = {currentUser.roles}
            userId = {currentUser.id}
            />
        );
    };
    const mapFileTypes = (fileType) => {
        return (
        <option value={fileType.id} key={fileType.id}>{fileType.name}</option>
        )
    }
    // Pagination ------------------
    const idxChange = (page) => {
        setPageInfo((prevState)=>{
            const pd = {...prevState}
            pd.current = page
            pd.pageIndex = page -1
            pd.searchQuery = files.searchBar
            return pd;
        })
    }
    // Search Bar ------------------    
    const onSearchChange = (event) => { 

        const target = event.target;

		const value = target.value;

		const name = target.name;

		setFileInfo((prevState) => {
			const newSearchObject = {
				...prevState,
			};

			newSearchObject[name] = value;

			return newSearchObject;
		});
	};
	const submitSearch = () => {
        _logger("Search Submit")
		setPageInfo((prevstate) => {
			const pd = { ...prevstate };
			pd.pageIndex = 0;
			pd.searchQuery = files.searchBar;
            pd.fileId = files.fileId
			return pd;
		});
	};
	const onFileTypeChange = (event) => {
		const target = event.target;

		const value = target.value;

		const name = target.name;

		setFileInfo((prevState) => {
			const newFileType = {
				...prevState,
			};

			newFileType[name] = value;

			return newFileType;
		});
		setPageInfo((prevState) => {
			const newFileType = {
				...prevState,
			};

			newFileType[name] = value;

            return newFileType;
        })
    }
    // Nav buttons --------------
    const onTrashClick = () =>{       
        setFileInfo((prevState)=>{
            const pd = {...prevState};
            pd.isDeleted = true;
            pd.ownedByUser = true;
            _logger(pd);
            return pd;
        })
        setPageInfo((prevstate)=>{
            const pd = {...prevstate};
            pd.pageIndex = 0
            return pd;
        })
    }
    const onSentClick = () => {
        setFileInfo((prevState)=>{
            const pd = {...prevState};
            pd.isDeleted = false;
            pd.ownedByUser = true;
            _logger(pd);
            return pd;
        })
        setPageInfo((prevstate)=>{
            const pd = {...prevstate};
            pd.pageIndex = 0
            return pd;
        })
    }
    const onInboxClick = () => {
        setFileInfo((prevState)=>{
            const pd = {...prevState};
            pd.isDeleted = false;
            pd.ownedByUser = false;
            _logger(pd);
            return pd;
        })
        setPageInfo((prevstate)=>{
            const pd = {...prevstate};
            pd.pageIndex = 0
            return pd;
        })
    }
    // Return ----------------
    return (
        <React.Fragment>
            <div className="file-main-card ">
                {/* File nav bar */}
                <div className="file-nav-bar shadow-lg">
                    <div className="file-nav-button file-nav-center">
                        <Button className="file-nav-button mt-3" id="Inbox" onClick={onInboxClick}>
                            <h5 className="file-center file-button-text">Files</h5>
                        </Button>
                        <Button className="file-nav-button" id="Sent" onClick={onSentClick}>
                            <h5 className="file-center file-button-text">My Uploads</h5>
                        </Button>
                        <Button className="file-nav-button" id="Trash" onClick={onTrashClick}>
                            <h5 className="file-center file-button-text">Trash</h5>
                        </Button>
                    </div>
                    <Formik
                    enableReinitialize={true}
                    initialValues={files}
                    onSubmit={submitSearch}
                    validationSchema={SearchSchema}
                    > 
                        <Form>
                            <label
                            className="file-form-center file-search-bar"
                            >
                                Search
                            </label>                
                            <Field
                            type="text"
                            id="searchByNameInput"
                            placeholder="File Name"
                            name="searchBar"
                            className="file-form-center file-search-bar"
                            onChange={onSearchChange}
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') {
                                    submitSearch();
                                }
                            }}
                            />
                            <Field
                            type="text"
                            id="searchByIdInput"
                            placeholder="File Id"
                            name="fileId"
                            className="file-form-center file-search-bar mt-2"
                            onChange={onSearchChange}
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') {
                                    submitSearch();
                                }
                            }}
                            />
                            <Field
                            as="select"
                            id="selectFileType"
                            placeholder="0"
                            name="fileType"
                            className="file-form-center file-search-bar mb-2 mt-2"
                            onChange={onFileTypeChange}
                            >
                                <option value="0">Select file type</option>
                                {files.fileTypeComponents}
                            </Field>
                        </Form>
                    </Formik>
                </div>
                {/* Main body */}
                <div className="file-main-body">
                    {/* file container */}
                    <div className="file-card-header shadow-lg">
                    <h3 className="mt-1 mb-1">Files</h3>
                    </div>
                    <div className="file-labels">
                        <h4 key={"labelName"} className="file-labels-fileName mt-1 mb-1">Name</h4>
                        <h4 key={"uploader"} className="file-labels-uploaderName mt-1 mb-1">Uploader</h4>
                        <h4 key={"id"} className="file-labels-id mt-1 mb-1">File Id</h4>
                        <h4 key={"modified"} className="file-labels-modified mt-1 mb-1">Modified</h4>
                        <h4 key={"options"} className="file-labels-options mt-1 mb-1">Options</h4>
                    </div>
                    <div className="file-container">
                        {files.fileComponents}
                    </div>
                    <div className="file-card-footer shadow-lg">
                    {/* Paginate */}
                    <Pagination
                     className="file-center"
                     onChange={idxChange}
                     pageSize={pageInfo.pageSize}
                     current={pageInfo.current}
                     total={pageInfo.fileCount}
                     locale={locale}
                    />
                    </div>
                </div>
            </div>                
        </React.Fragment>
    )
}
FilePagination.propTypes = {
	currentUser: PropTypes.shape({
		email: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		roles: PropTypes.arrayOf(PropTypes.string.isRequired),
	}),
};
export default FilePagination;
