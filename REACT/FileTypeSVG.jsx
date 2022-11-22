import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";

const _logger = debug.extend("fileTypeSVG");
function FileTypeSVG({fileType}){
    _logger("fileType --->", fileType)
    const svgImgArray = [
        {
            name: "txt",
            svg:{
                pathA: "M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z",
                pathB: "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z",
                color: "text-warning bg-light-warning",
            }
        },
        {
            name: "jfif",
            svg: {
                pathA: "M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                pathB: "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z",
                color: "text-info bg-light-info",
            }
        },
        {
            name: "pdf",
            svg: {
                pathA: "M6 5a1 1 0 0 1 1-1h1.188a2.75 2.75 0 0 1 0 5.5H7v2a.5.5 0 0 1-1 0V5zm1 3.5h1.188a1.75 1.75 0 1 0 0-3.5H7v3.5z",
                pathB: "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z",
                color: "text-danger bg-light-danger",
            }
        },
        {
            name: "doc",
            svg: {
                pathA: "M4.879 4.515a.5.5 0 0 1 .606.364l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 0 1 .364-.606z",
                pathB: "M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z",
                color: "text-success bg-light-success",
            }
        },
        {
            name: "jpg",
            svg: {
                pathA: "M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                pathB: "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z",
                color: "text-warning bg-light-warning",
            }
        },
        {
            name: "jpeg",
            svg: {
                pathA: "M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                pathB: "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z",
                color: "text-warning bg-light-warning",
            }
        },
        {
            name: "jgp",
            svg: {
                pathA: "M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                pathB: "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z",
                color: "text-success bg-light-success",
            }
        },
        {
            name: "pptx",
            svg: {
                pathA: "M6 5a1 1 0 0 1 1-1h1.188a2.75 2.75 0 0 1 0 5.5H7v2a.5.5 0 0 1-1 0V5zm1 3.5h1.188a1.75 1.75 0 1 0 0-3.5H7v3.5z",
                pathB: "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z",
                color: "text-info bg-light-info",
            }
        },
        {
            name: "png",
            svg: {
                pathA: "M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                pathB: "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z",
                color: "text-primary bg-light-primary",
            }
        },
        {
            name: "webp",
            svg: {
                pathA: "M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z",
                pathB: "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z",
                color: "text-danger bg-light-danger",
            }
        },
        {
            name: "docx",
            svg: {
                pathA: "M4.879 4.515a.5.5 0 0 1 .606.364l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 7.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 0 1 .364-.606z",
                pathB: "M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z",
                color: "text-info bg-light-info",
            }
        },
        {
            name: "gif",
            svg: {
                pathA: "M5 6a.5.5 0 0 0-.496.438l-.5 4A.5.5 0 0 0 4.5 11h3v2.016c-.863.055-1.5.251-1.5.484 0 .276.895.5 2 .5s2-.224 2-.5c0-.233-.637-.429-1.5-.484V11h3a.5.5 0 0 0 .496-.562l-.5-4A.5.5 0 0 0 11 6H5zm2 3.78V7.22c0-.096.106-.156.19-.106l2.13 1.279a.125.125 0 0 1 0 .214l-2.13 1.28A.125.125 0 0 1 7 9.778z",
                pathB: "M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z",
                color: "text-danger bg-light-danger",
            }
        },
    ]
    const filterSvgImg = (aSvg) => {
        _logger(aSvg, fileType)
        let svgImg = null;
        if (fileType === aSvg.name)
        {
            svgImg = aSvg
        }
        _logger("fileter svgImg --->",svgImg)
        return svgImg
    }
    const svgImgObjectArray = svgImgArray.filter(filterSvgImg)
    _logger("svgImgObjectArray --->", svgImgObjectArray)
    const svgImgObject = svgImgObjectArray[0].svg
    _logger("svgImgObject --->",svgImgObject)

    const colorClass = `icon-shape icon-lg rounded-3 ${svgImgObject.color}`
    return (
        <React.Fragment>
            <div className={colorClass}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="24"
                    height="24"
                    fill="currentColor"
                    >
                    <path
                        d={svgImgObject.pathA}
                        >
                    </path>
                    <path
                        d={svgImgObject.pathB}
                        >
                    </path>
                </svg>
            </div>
        </React.Fragment>
    )
}
FileTypeSVG.propTypes = {
    fileType: PropTypes.string.isRequired
}
export default FileTypeSVG;