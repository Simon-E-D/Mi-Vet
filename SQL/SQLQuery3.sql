USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Files_Select_By_FileType_And_IsDeleted]    Script Date: 11/22/2022 12:51:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Simon Dilger
-- Create date: 11/05/2022
-- Description: Files Select By FileType and IsDeleted
-- Code Reviewer: Zachary Frappier
-- =============================================
ALTER PROC [dbo].[Files_Select_By_FileType_And_IsDeleted]
			@PageSize int
			,@PageIndex int
			,@DeleteQuery bit
			,@FileTypeId int
AS
/*
--Reminder that the DeleteQuery = 0 means not deleted. 1 means deleted.

Declare	@PageSize int = 25
		,@PageIndex int = 0
		,@DeleteQuery int = 0
		,@FileTypeId int = 12

EXECUTE [dbo].[Files_Select_By_FileType_And_IsDeleted]
		@PageSize
		,@PageIndex
		,@DeleteQuery
		,@FileTypeId
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
		WHERE @DeleteQuery = [f].[IsDeleted] AND @FileTypeId = ft.Id
	  ORDER BY [f].[DateCreated] DESC

	  OFFSET @Offset ROWS 
	  FETCH NEXT @PageSize ROWS ONLY

END