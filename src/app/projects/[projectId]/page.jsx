import ProjectView from '@/modules/projects/components/project-view';
import React from 'react';

export const runtime = "nodejs";

const Page = async ({ params }) => {
  const { projectId } = params;

  return <ProjectView projectId={projectId} />;
};

export default Page;
