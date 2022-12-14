USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Files_Select_By_Name_IsDeleted]    Script Date: 11/22/2022 12:51:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Simon Dilger
-- Create date: 11/17/2022
-- Description: Files Select By Name and IsDeleted
-- Code Reviewer: Jonathan Mercado

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
ALTER PROC [dbo].[Files_Select_By_Name_IsDeleted]
			@PageSize int
			,@PageIndex int
			,@DeleteQuery bit
			,@FileName nvarchar(255)
AS
/*
--Reminder that the DeleteQuery = 0 means not deleted. 1 means deleted.

Declare	@PageSize int = 10
		,@PageIndex int = 0
		,@DeleteQuery int = 0
		,@FileName nvarchar(255) = ' Name'

EXECUTE [dbo].[Files_Select_By_Name_IsDeleted]
		@PageSize
		,@PageIndex
		,@DeleteQuery
		,@FileName
*/
BEGIN

	DECLARE @Offset int = @PageSize * @PageIndex

	SELECT [f].[Id]
		  ,[f].[Name]
		  ,[f].[Url]
		  ,[ft].[Id] AS FileTypeId
		  ,[ft].[Name] AS FileTypeName
		  ,[f].[IsDeleted]
		  ,[u].[Id] AS CreaterId
		  ,[u].[Title]
		  ,[u].[FirstName]
		  ,[u].[LastName]
		  ,[f].[DateCreated]
		  ,TotalCount = COUNT(1) OVER()
	  FROM [dbo].[Files] AS f 
		INNER JOIN [dbo].[FileTypes] AS ft
			on [f].[FileTypeId] = [ft].[Id]
		INNER JOIN [dbo].[Users] AS u
			on [f].[CreatedBy] = [u].[Id]
		WHERE @DeleteQuery = [f].[IsDeleted]
			AND @FileName = [f].[Name]
	  ORDER BY [f].[DateCreated] DESC

	  OFFSET @Offset ROWS 
	  FETCH NEXT @PageSize ROWS ONLY

END