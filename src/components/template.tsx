"use client";

import { useInitialize } from "@ogs-gmbh/react-hooks";
import { Renderer } from "../renderer/renderer.js";
import type { DynamicElementProps } from "../renderer/type.js";
import { useGuthrieTemplateStore } from "../stores/templates.js";

/**
 * Props for the {@link SlotTemplate} component.
 *
 * @since 1.0.0
 * @category Components
 * @author Simon Kovtyk
 * @author David Schummer
 */
type SlotTemplateProps = {
  /** Unique reference name for the template */
  refName: string;
  /** Template content */
  _children: DynamicElementProps[];
};

/**
 * Registers a template under a given reference name.
 *
 * This component does not render any content. Instead, it stores the provided
 * children in the template store, making them available for later rendering
 * via {@link SlotTemplateRenderer}.
 *
 * @remarks
 * - Does not render DOM output
 * - Intended for defining reusable template blocks
 *
 * @returns React Component (empty Fragment)
 *
 * @since 1.0.0
 * @category Components
 * @author your name
 */
function SlotTemplate({ refName, _children }: SlotTemplateProps) {
  const addTemplate = useGuthrieTemplateStore((state) => state.addTemplate);

  useInitialize(() => {
    if (refName) addTemplate(refName, _children);
  });

  return <></>; // oxlint-disable-line eslint-plugin-react(jsx-no-useless-fragment)
}

/**
 * Props for the {@link SlotTemplateRenderer} component.
 *
 * @since 1.0.0
 * @category Components
 * @author David Schummer
 */
type SlotTemplateRendererProps = {
  templateRef: string;
};

/**
 * Renders a previously registered template.
 *
 * This component retrieves a template by its reference name and renders
 * its content using {@link Renderer}.
 *
 * @remarks
 * - Requires a template defined via {@link SlotTemplate}
 * - Renders nothing if the template is not found
 *
 * @returns React Component
 *
 * @since 1.0.0
 * @category Components
 * @author David Schummer
 * @author Simon Kovtyk
 */
function SlotTemplateRenderer({ templateRef }: SlotTemplateRendererProps) {
  const templates = useGuthrieTemplateStore((state) => state.templates[templateRef]);

  return templates?.map((dynamicElementProps, index) => (
    <Renderer key={index} {...dynamicElementProps} />
  ));
}

export type { SlotTemplateProps, SlotTemplateRendererProps };

export { SlotTemplate, SlotTemplateRenderer };
