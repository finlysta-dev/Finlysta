-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLogo" TEXT,
    "aboutCompany" TEXT,
    "type" TEXT NOT NULL,
    "workMode" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT,
    "duration" TEXT,
    "salary" TEXT,
    "skills" TEXT[],
    "overview" TEXT,
    "responsibilities" TEXT,
    "qualifications" TEXT,
    "benefits" TEXT,
    "applyLink" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "isActivelyHiring" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "applyClicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityView" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "sessionId" TEXT,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpportunityView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityClick" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "sessionId" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpportunityClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemStat" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerResource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT,
    "category" TEXT NOT NULL,
    "coverImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileUrl" TEXT,
    "link" TEXT,
    "type" TEXT DEFAULT 'text',
    "downloadCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CareerResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "page" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "reply" TEXT,
    "repliedAt" TIMESTAMP(3),
    "repliedBy" TEXT,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStat" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalVisitors" INTEGER NOT NULL DEFAULT 0,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "applications" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_slug_key" ON "Opportunity"("slug");

-- CreateIndex
CREATE INDEX "Opportunity_type_idx" ON "Opportunity"("type");

-- CreateIndex
CREATE INDEX "Opportunity_location_idx" ON "Opportunity"("location");

-- CreateIndex
CREATE INDEX "Opportunity_workMode_idx" ON "Opportunity"("workMode");

-- CreateIndex
CREATE INDEX "Opportunity_postedAt_idx" ON "Opportunity"("postedAt");

-- CreateIndex
CREATE INDEX "Opportunity_isTrending_idx" ON "Opportunity"("isTrending");

-- CreateIndex
CREATE INDEX "Opportunity_isVerified_idx" ON "Opportunity"("isVerified");

-- CreateIndex
CREATE INDEX "Opportunity_published_idx" ON "Opportunity"("published");

-- CreateIndex
CREATE INDEX "OpportunityView_opportunityId_idx" ON "OpportunityView"("opportunityId");

-- CreateIndex
CREATE INDEX "OpportunityView_viewedAt_idx" ON "OpportunityView"("viewedAt");

-- CreateIndex
CREATE INDEX "OpportunityView_sessionId_idx" ON "OpportunityView"("sessionId");

-- CreateIndex
CREATE INDEX "OpportunityClick_opportunityId_idx" ON "OpportunityClick"("opportunityId");

-- CreateIndex
CREATE INDEX "OpportunityClick_clickedAt_idx" ON "OpportunityClick"("clickedAt");

-- CreateIndex
CREATE INDEX "OpportunityClick_sessionId_idx" ON "OpportunityClick"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CareerResource_slug_key" ON "CareerResource"("slug");

-- CreateIndex
CREATE INDEX "CareerResource_category_idx" ON "CareerResource"("category");

-- CreateIndex
CREATE INDEX "CareerResource_published_idx" ON "CareerResource"("published");

-- CreateIndex
CREATE INDEX "Visitor_sessionId_idx" ON "Visitor"("sessionId");

-- CreateIndex
CREATE INDEX "Visitor_createdAt_idx" ON "Visitor"("createdAt");

-- CreateIndex
CREATE INDEX "Visitor_page_idx" ON "Visitor"("page");

-- CreateIndex
CREATE INDEX "ContactMessage_status_idx" ON "ContactMessage"("status");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStat_date_key" ON "DailyStat"("date");

-- CreateIndex
CREATE INDEX "DailyStat_date_idx" ON "DailyStat"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- AddForeignKey
ALTER TABLE "OpportunityView" ADD CONSTRAINT "OpportunityView_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityClick" ADD CONSTRAINT "OpportunityClick_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
