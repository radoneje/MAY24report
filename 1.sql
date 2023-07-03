USE [NewsFactory]
GO

/****** Object:  View [dbo].[vNode_ScriptBlocks]    Script Date: 03.07.2023 20:08:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vNode_ScriptBlocks] AS
select b.id,
b.name, bt.TypeName as typename, blocktype,
[CreatorId], autors.UserName as author,
[OperatorId], op.UserName as operator,
[JockeyId], jk.UserName as jockey,
[CutterId], ct.UserName as cutter,
[NewsId],[ParentId],[BlockTime],[TaskTime],[CalcTime],[BlockText],[Sort],
[Ready],[Approve],[TextLang1],
[TextLang2],[TextLang3],[isChanged],[isDisable]
FROM blocks b
LEFT JOIN [dbo].[BlockType] bt ON b.BLockType=bt.id
LEFT JOIN users autors ON autors.UserID=b.CreatorId
LEFT JOIN users op ON op.UserID=b.OperatorId
LEFT JOIN users jk ON op.UserID=b.JockeyId
LEFT JOIN users ct ON op.UserID=b.CutterId

WHERE b.deleted=0 AND parentid=0
GO
USE [NewsFactory]
GO

/****** Object:  View [dbo].[vNode_ScriptArchBlocks]    Script Date: 03.07.2023 20:08:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vNode_ScriptArchBlocks] AS
select b.id,
b.name, bt.TypeName as typename, blocktype,
[CreatorId], autors.UserName as author,
[OperatorId], op.UserName as operator,
[JockeyId], jk.UserName as jockey,
[CutterId], ct.UserName as cutter,
[NewsId],[ParentId],[BlockTime],[TaskTime],[CalcTime],[BlockText],[Sort],
[Ready],[Approve],[TextLang1],
[TextLang2],[TextLang3]
FROM archblocks b
LEFT JOIN [dbo].[BlockType] bt ON b.BLockType=bt.id
LEFT JOIN users autors ON autors.UserID=b.CreatorId
LEFT JOIN users op ON op.UserID=b.OperatorId
LEFT JOIN users jk ON op.UserID=b.JockeyId
LEFT JOIN users ct ON op.UserID=b.CutterId

WHERE b.deleted=0 AND parentid=0
GO

USE [NewsFactory]
GO

/****** Object:  View [dbo].[vNode_News]    Script Date: 03.07.2023 20:08:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
CREATE VIEW [dbo].[vNode_News] AS
SELECT n.*, u.UserName as editor
  FROM [NewsFactory].[dbo].[News] n
  LEFT JOIN users u ON n.EditorId=u.userid

  WHERE n.[NewsDate]<=GETDATE() AND n.[NewsDate]>DATEADD(month,-2,GETDATE()) AND n.Deleted=0
GO

USE [NewsFactory]
GO

/****** Object:  View [dbo].[vNode_blocks]    Script Date: 03.07.2023 20:07:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
CREATE VIEW [dbo].[vNode_blocks]
AS
SELECT        b.*, bt.TypeName AS type, u.username
FROM            dbo.Blocks AS b
LEFT OUTER JOIN
                         dbo.BlockType AS bt ON b.BLockType = bt.id
LEFT JOIN users u ON u.userid=b.creatorid
WHERE        (b.deleted = 0) AND (b.ParentId = 0)
GO


USE [NewsFactory]
GO

/****** Object:  View [dbo].[vNode_ArchNews]    Script Date: 03.07.2023 20:07:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
CREATE VIEW [dbo].[vNode_ArchNews] AS
SELECT n.*, u.UserName as editor

  FROM [NewsFactory].[dbo].[ArcNews] n
  LEFT JOIN users u ON n.EditorId=u.userid

   WHERE n.[NewsDate]<=GETDATE() AND n.[NewsDate]>DATEADD(month,-2,GETDATE()) AND n.Deleted=0
GO

USE [NewsFactory]
GO

/****** Object:  View [dbo].[vNode_archblocks]    Script Date: 03.07.2023 20:07:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vNode_archblocks] AS
SELECT b.*, bt.TypeName as type, u.username

  FROM ArchBlocks  b
  LEFT JOIN BlockType bt on b.BLockType=bt.id
  LEFT JOIN users u ON u.userid=b.creatorid
  WHERE b.Deleted=0 AND (b.ParentId = 0)
GO






