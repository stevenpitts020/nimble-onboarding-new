import React, { useEffect, useRef } from "react";

let instance, PSPDFKit;

const PdfViewer: React.FC = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    (async function () {
      PSPDFKit = await import("pspdfkit");
      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: "/document.pdf",
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
      instance.setViewState((viewState) => viewState.set("showToolbar", false));
      createSign();
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [containerRef]);

  const createSign = () => {
    const widget = new PSPDFKit.Annotations.WidgetAnnotation({
      id: "signature",
      pageIndex: 1,
      boundingBox: new PSPDFKit.Geometry.Rect({
        left: 453,
        top: 703,
        width: 102,
        height: 35,
      }),
      formFieldName: "my signature form field",
    });
    const formField = new PSPDFKit.FormFields.SignatureFormField({
      name: "my signature form field",
      annotationIds: new PSPDFKit.Immutable.List([widget.id]),
    });
    instance.create([widget, formField]);
  };

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default PdfViewer;
