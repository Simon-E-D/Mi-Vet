USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Files_Select_By_IsDeleted_And_User]    Script Date: 11/22/2022 12:51:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Simon Dilger
-- Create date: 10/21/2022
-- Description: Files Select By IsDeleted and User
-- Code Reviewer: Gideon Macapagal

-- MODIFIED BY: Simon Dilger
-- MODIFIED DATE:10/26/2022
-- Code Reviewer: Min Jae Kang
-- Note: Removed extra user data  
-- =============================================
ALTER PROC [dbo].[Files_Select_By_IsDeleted_And_User]
			@UserQuery int
			,@PageSize int
			,@PageIndex int
			,@DeleteQuery bit
AS
/*
--Reminder that the DeleteQuery = 0 means not deleted. 1 means deleted.

Declare	@UserQuery int = 38
		,@PageSize int = 10
		,@PageIndex int = 0
		,@DeleteQuery int = 0

EXECUTE [dbo].[Files_Select_By_IsDeleted_And_User]
		@UserQuery
		,@PageSize
		,@PageIndex
		,@DeleteQuery
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


		WHERE @DeleteQuery = [f].[IsDeleted] AND @UserQuery = u.Id
	  ORDER BY [f].[DateCreated] DESC

	  OFFSET @Offset ROWS 
	  FETCH NEXT @PageSize ROWS ONLY

END