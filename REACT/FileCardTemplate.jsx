import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import FileTypeSVG from "./FileTypeSVG"

const _logger = debug.extend("fileService");
function FileCardTemplate({file, trashManagment, deleteFile, downloadFile, currentRoles, userId }) {
    let dwnRecImg = file.isDeleted ? "https://bit.ly/3Ttlchl" : "https://bit.ly/3gnQOq4"
    let dwnRecAlt = file.isDeleted ? "Recover" : "Download"
    _logger("propsInfo --->", file)
    let dateTime = file.dateCreated
    let date = dateTime.substring(0, 10)
    let creatorTitle = file.createdBy.title
    let ownedByUser = userId === file.createdBy.id
    if (creatorTitle === null)
    {
        creatorTitle = ""
    }
    let isInTrash = file.isDeleted
    const deleteButtonClicked = (e) => {
        e.preventDefault();
        _logger("delete file -->", file)
        isInTrash ? deleteFile(file):trashManagment(file)
    }
    const downloadRecoverClicked = (e) => {
        e.preventDefault();
        _logger("dwnRec file -->", file)
        isInTrash ? trashManagment(file):downloadFile(file)
    }
    return (
        <React.Fragment>
            <div className="file-card-mappedFiles shadow-lg">
                <div className="file-svg align-bottom">
                <FileTypeSVG
                fileType = {file.fileType.name}
                />
                </div>
                <h4 className="file-name file-column-virtical-center">{file.name}</h4>
                <h4 className="file-created-by file-column-virtical-center">{
                    `${creatorTitle} ${file.createdBy.firstName} ${file.createdBy.lastName}`
                }</h4>
                <h4 className="file-id file-column-virtical-center">{file.id}</h4>
                <h4 className="file-date-modified file-column-virtical-center">{date}</h4>
                <div className="file-column-virtical-center">
                    <img
                    src = {dwnRecImg}
                    alt = {dwnRecAlt}
                    className="file-option-button"
                    onClick={downloadRecoverClicked}
                    id="downLoad-recover"
                    />
                    {currentRoles.includes("Admin") || ownedByUser ? (
                    <img
                    src = "https://bit.ly/3TLVbty"
                    alt ="Delete"
                    className="file-option-img file-option-button" 
                    onClick={deleteButtonClicked}
                    id="delete"
                    />
                    ):(
                    <div></div>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}
FileCardTemplate.propTypes = {
    file: PropTypes.shape({
        dateCreated: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isDeleted: PropTypes.bool.isRequired,
        url: PropTypes.string.isRequired,
        createdBy: PropTypes.shape({ 
            firstName: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            lastName: PropTypes.string.isRequired,
            title: PropTypes.string,
        }),
        fileType: PropTypes.shape({ 
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }),
    trashManagment: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    downloadFile: PropTypes.func.isRequired,
    currentRoles: PropTypes.arrayOf(PropTypes.string.isRequired),
    userId: PropTypes.number.isRequired,
}
export default (FileCardTemplate);