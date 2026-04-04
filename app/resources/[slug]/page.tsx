import prisma from "@/lib/prisma";

export default async function ResourcePage({ params }: any) {

  const resource = await prisma.careerResource.findUnique({
    where: { slug: params.slug }
  });

  if (!resource) return <div>Not found</div>;

  return (

    <div className="p-8 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">
        {resource.title}
      </h1>

      <p className="text-gray-600 mb-6">
        {resource.excerpt}
      </p>

      <div className="whitespace-pre-line">
        {resource.content}
      </div>

    </div>

  );

}