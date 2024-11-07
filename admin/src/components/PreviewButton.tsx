import { LinkButton } from "@strapi/design-system";
import { unstable_useContentManagerContext as useContentManagerContent } from "@strapi/strapi/admin";

export default function PreviewButton() {
  const { hasDraftAndPublish, contentType, id } = useContentManagerContent();
  // const [slug, setSlug] = useState<string>("");

  // const { get } = useFetchClient();

  // async function returnSlug() {
  //   const res = await fetch(
  //     // @ts-expect-error info does exist
  //     `/api/${contentType.info.pluralName}?filters[documentId]=${id}&status=draft`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${key}`,
  //       },
  //     }
  //   );

  //   const getRes = get(
  //     `/api/${contentType.info.pluralName}?filters[documentId]=${id}&status=draft`
  //   );

  //   console.log(getRes);

  //   const resJson = await res.json();
  //   setSlug(resJson?.data[0]?.slug);
  // }

  // useEffect(() => {
  //   returnSlug();
  // }, []);

  const href = `${process.env.APP_URL || "http://localhost:3000"}/api/draft?contentType=${contentType?.apiID}&documentId=${id}`;

  return (
    <LinkButton
      href={href}
      target="_blank"
      disabled={!hasDraftAndPublish}
      style={{ width: "100%" }}
    >
      Preview Draft
    </LinkButton>
  );
}
