import { useRef, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
import { LinkButton } from "@strapi/design-system";
import { unstable_useContentManagerContext } from "@strapi/strapi/admin";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "preview-button";
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(PLUGIN_ID);
    console.log("preview-button init");
  }, []);
  return null;
};
function PreviewButton() {
  const { hasDraftAndPublish, contentType, id } = unstable_useContentManagerContext();
  const href = `${process.env.APP_URL || "http://localhost:3000"}/api/draft?contentType=${contentType?.apiID}&documentId=${id}`;
  return /* @__PURE__ */ jsx(
    LinkButton,
    {
      href,
      target: "_blank",
      disabled: !hasDraftAndPublish,
      style: { width: "100%" },
      children: "Preview Draft"
    }
  );
}
const index = {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  bootstrap(app) {
    app.getPlugin("content-manager").injectComponent("editView", "right-links", {
      name: "preview-button",
      Component: PreviewButton
    });
  },
  async registerTrads(app) {
    const { locales } = app;
    const importedTranslations = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("../_chunks/en-Byx4XI2L.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: getTranslation(data),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return importedTranslations;
  }
};
export {
  index as default
};
