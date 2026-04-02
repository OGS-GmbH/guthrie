// oxlint-disable jsdoc/require-returns
import {type ComponentPropsWithRef} from "react";

/**
 * Props for the {@link Text} component.
 *
 * @since 1.0.0
 * @category Intrinsics
 * @author David Schummer
 */
type TextProps = { content: string };

/**
 * Renders plain text content without creating an HTML element.
 *
 * Unlike intrinsic components, this does not produce a DOM node.
 * It only returns text nodes.
 *
 * @since 1.0.0
 * @category Intrinsics
 * @author David Schummer
 */
function Text({content}: TextProps) {
  // oxlint-disable-next-line react/jsx-no-useless-fragment
  return <>{content}</>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a
 * @author David Schummer */
function A({...props}: ComponentPropsWithRef<"a">) {
  return <a {...props}>{props.children}</a>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/abbr
 * @author David Schummer */
function Abbr({...props}: ComponentPropsWithRef<"abbr">) {
  return <abbr {...props}>{props.children}</abbr>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/address
 * @author David Schummer */
function Address({...props}: ComponentPropsWithRef<"address">) {
  return <address {...props}>{props.children}</address>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area
 * @author David Schummer */
function Area({...props}: ComponentPropsWithRef<"area">) {
  return <area {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article
 * @author David Schummer */
function Article({...props}: ComponentPropsWithRef<"article">) {
  return <article {...props}>{props.children}</article>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside
 * @author David Schummer */
function Aside({...props}: ComponentPropsWithRef<"aside">) {
  return <aside {...props}>{props.children}</aside>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Audio
 * @author David Schummer */
function Audio({...props}: ComponentPropsWithRef<"audio">) {
  return <audio {...props}>{props.children}</audio>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/b
 * @author David Schummer */
function B({...props}: ComponentPropsWithRef<"b">) {
  return <b {...props}>{props.children}</b>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/base
 * @author David Schummer */
function Base({...props}: ComponentPropsWithRef<"base">) {
  return <base {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdi
 * @author David Schummer */
function Bdi({...props}: ComponentPropsWithRef<"bdi">) {
  return <bdi {...props}>{props.children}</bdi>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/bdo
 * @author David Schummer */
function Bdo({...props}: ComponentPropsWithRef<"bdo">) {
  return <bdo {...props}>{props.children}</bdo>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote
 * @author David Schummer */
function Blockquote({...props}: ComponentPropsWithRef<"blockquote">) {
  return <blockquote {...props}>{props.children}</blockquote>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/body
 * @author David Schummer */
function Body({...props}: ComponentPropsWithRef<"body">) {
  return <body {...props}>{props.children}</body>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/br
 * @author David Schummer */
function Br({...props}: ComponentPropsWithRef<"br">) {
  return <br {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button
 * @author David Schummer */
function Button({...props}: ComponentPropsWithRef<"button">) {
  return <button {...props}>{props.children}</button>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas
 * @author David Schummer */
function Canvas({...props}: ComponentPropsWithRef<"canvas">) {
  return <canvas {...props}>{props.children}</canvas>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption
 * @author David Schummer */
function Caption({...props}: ComponentPropsWithRef<"caption">) {
  return <caption {...props}>{props.children}</caption>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/cite
 * @author David Schummer */
function Cite({...props}: ComponentPropsWithRef<"cite">) {
  return <cite {...props}>{props.children}</cite>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code
 * @author David Schummer */
function Code({...props}: ComponentPropsWithRef<"code">) {
  return <code {...props}>{props.children}</code>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/col
 * @author David Schummer */
function Col({...props}: ComponentPropsWithRef<"col">) {
  return <col {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/colgroup
 * @author David Schummer */
function Colgroup({...props}: ComponentPropsWithRef<"colgroup">) {
  return <colgroup {...props}>{props.children}</colgroup>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/data
 * @author David Schummer */
function Data({...props}: ComponentPropsWithRef<"data">) {
  return <data {...props}>{props.children}</data>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist
 * @author David Schummer */
function Datalist({...props}: ComponentPropsWithRef<"datalist">) {
  return <datalist {...props}>{props.children}</datalist>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dd
 * @author David Schummer */
function Dd({...props}: ComponentPropsWithRef<"dd">) {
  return <dd {...props}>{props.children}</dd>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/del
 * @author David Schummer */
function Del({...props}: ComponentPropsWithRef<"del">) {
  return <del {...props}>{props.children}</del>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details
 * @author David Schummer */
function Details({...props}: ComponentPropsWithRef<"details">) {
  return <details {...props}>{props.children}</details>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dfn
 * @author David Schummer */
function Dfn({...props}: ComponentPropsWithRef<"dfn">) {
  return <dfn {...props}>{props.children}</dfn>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
 * @author David Schummer */
function Dialog({...props}: ComponentPropsWithRef<"dialog">) {
  return <dialog {...props}>{props.children}</dialog>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/div
 * @author David Schummer */
function Div({...props}: ComponentPropsWithRef<"div">) {
  return <div {...props}>{props.children}</div>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl
 * @author David Schummer */
function Dl({...props}: ComponentPropsWithRef<"dl">) {
  return <dl {...props}>{props.children}</dl>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dt
 * @author David Schummer */
function Dt({...props}: ComponentPropsWithRef<"dt">) {
  return <dt {...props}>{props.children}</dt>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/em
 * @author David Schummer */
function Em({...props}: ComponentPropsWithRef<"em">) {
  return <em {...props}>{props.children}</em>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed
 * @author David Schummer */
function Embed({...props}: ComponentPropsWithRef<"embed">) {
  return <embed {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset
 * @author David Schummer */
function Fieldset({...props}: ComponentPropsWithRef<"fieldset">) {
  return <fieldset {...props}>{props.children}</fieldset>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figcaption
 * @author David Schummer */
function Figcaption({...props}: ComponentPropsWithRef<"figcaption">) {
  return <figcaption {...props}>{props.children}</figcaption>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/figure
 * @author David Schummer */
function Figure({...props}: ComponentPropsWithRef<"figure">) {
  return <figure {...props}>{props.children}</figure>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer
 * @author David Schummer */
function Footer({...props}: ComponentPropsWithRef<"footer">) {
  return <footer {...props}>{props.children}</footer>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form
 * @author David Schummer */
function Form({...props}: ComponentPropsWithRef<"form">) {
  return <form {...props}>{props.children}</form>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/h1
 * @author David Schummer */
function H1({...props}: ComponentPropsWithRef<"h1">) {
  return <h1 {...props}>{props.children}</h1>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/h2
 * @author David Schummer */
function H2({...props}: ComponentPropsWithRef<"h2">) {
  return <h2 {...props}>{props.children}</h2>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/h3
 * @author David Schummer */
function H3({...props}: ComponentPropsWithRef<"h3">) {
  return <h3 {...props}>{props.children}</h3>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/h4
 * @author David Schummer */
function H4({...props}: ComponentPropsWithRef<"h4">) {
  return <h4 {...props}>{props.children}</h4>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/h5
 * @author David Schummer */
function H5({...props}: ComponentPropsWithRef<"h5">) {
  return <h5 {...props}>{props.children}</h5>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/h6
 * @author David Schummer */
function H6({...props}: ComponentPropsWithRef<"h6">) {
  return <h6 {...props}>{props.children}</h6>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head
 * @author David Schummer */
function Head({...props}: ComponentPropsWithRef<"head">) {
  return <head {...props}>{props.children}</head>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header
 * @author David Schummer */
function Header({...props}: ComponentPropsWithRef<"header">) {
  return <header {...props}>{props.children}</header>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hgroup
 * @author David Schummer */
function Hgroup({...props}: ComponentPropsWithRef<"hgroup">) {
  return <hgroup {...props}>{props.children}</hgroup>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hr
 * @author David Schummer */
function Hr({...props}: ComponentPropsWithRef<"hr">) {
  return <hr {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/html
 * @author David Schummer */
function Html({...props}: ComponentPropsWithRef<"html">) {
  return <html {...props}>{props.children}</html>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/i
 * @author David Schummer */
function I({...props}: ComponentPropsWithRef<"i">) {
  return <i {...props}>{props.children}</i>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
 * @author David Schummer */
function Iframe({...props}: ComponentPropsWithRef<"iframe">) {
  return <iframe {...props}>{props.children}</iframe>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img
 * @author David Schummer */
function Img({...props}: ComponentPropsWithRef<"img">) {
  return <img {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input
 * @author David Schummer */
function Input({...props}: ComponentPropsWithRef<"input">) {
  return <input {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ins
 * @author David Schummer */
function Ins({...props}: ComponentPropsWithRef<"ins">) {
  return <ins {...props}>{props.children}</ins>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/kbd
 * @author David Schummer */
function Kbd({...props}: ComponentPropsWithRef<"kbd">) {
  return <kbd {...props}>{props.children}</kbd>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label
 * @author David Schummer */
function Label({...props}: ComponentPropsWithRef<"label">) {
  return <label {...props}>{props.children}</label>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend
 * @author David Schummer */
function Legend({...props}: ComponentPropsWithRef<"legend">) {
  return <legend {...props}>{props.children}</legend>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/li
 * @author David Schummer */
function Li({...props}: ComponentPropsWithRef<"li">) {
  return <li {...props}>{props.children}</li>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link
 * @author David Schummer */
function Link({...props}: ComponentPropsWithRef<"link">) {
  return <link {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main
 * @author David Schummer */
function Main({...props}: ComponentPropsWithRef<"main">) {
  return <main {...props}>{props.children}</main>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/map
 * @author David Schummer */
function Map({...props}: ComponentPropsWithRef<"map">) {
  return <map {...props}>{props.children}</map>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark
 * @author David Schummer */
function Mark({...props}: ComponentPropsWithRef<"mark">) {
  return <mark {...props}>{props.children}</mark>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu
 * @author David Schummer */
function Menu({...props}: ComponentPropsWithRef<"menu">) {
  return <menu {...props}>{props.children}</menu>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta
 * @author David Schummer */
function Meta({...props}: ComponentPropsWithRef<"meta">) {
  return <meta {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter
 * @author David Schummer */
function Meter({...props}: ComponentPropsWithRef<"meter">) {
  return <meter {...props}>{props.children}</meter>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav
 * @author David Schummer */
function Nav({...props}: ComponentPropsWithRef<"nav">) {
  return <nav {...props}>{props.children}</nav>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript
 * @author David Schummer */
function Noscript({...props}: ComponentPropsWithRef<"noscript">) {
  return <noscript {...props}>{props.children}</noscript>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/object
 * @author David Schummer */
function Object({...props}: ComponentPropsWithRef<"object">) {
  return <object {...props}>{props.children}</object>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol
 * @author David Schummer */
function Ol({...props}: ComponentPropsWithRef<"ol">) {
  return <ol {...props}>{props.children}</ol>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/optgroup
 * @author David Schummer */
function Optgroup({...props}: ComponentPropsWithRef<"optgroup">) {
  return <optgroup {...props}>{props.children}</optgroup>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option
 * @author David Schummer */
function Option({...props}: ComponentPropsWithRef<"option">) {
  return <option {...props}>{props.children}</option>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output
 * @author David Schummer */
function Output({...props}: ComponentPropsWithRef<"output">) {
  return <output {...props}>{props.children}</output>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p
 * @author David Schummer */
function P({...props}: ComponentPropsWithRef<"p">) {
  // geile hook wenn guthrieContext.autoRegisterEvents === false
  return <p {...props}>{props.children}</p>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture
 * @author David Schummer */
function Picture({...props}: ComponentPropsWithRef<"picture">) {
  return <picture {...props}>{props.children}</picture>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/pre
 * @author David Schummer */
function Pre({...props}: ComponentPropsWithRef<"pre">) {
  return <pre {...props}>{props.children}</pre>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress
 * @author David Schummer */
function Progress({...props}: ComponentPropsWithRef<"progress">) {
  return <progress {...props}>{props.children}</progress>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/q
 * @author David Schummer */
function Q({...props}: ComponentPropsWithRef<"q">) {
  return <q {...props}>{props.children}</q>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rp
 * @author David Schummer */
function Rp({...props}: ComponentPropsWithRef<"rp">) {
  return <rp {...props}>{props.children}</rp>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rt
 * @author David Schummer */
function Rt({...props}: ComponentPropsWithRef<"rt">) {
  return <rt {...props}>{props.children}</rt>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby
 * @author David Schummer */
function Ruby({...props}: ComponentPropsWithRef<"ruby">) {
  return <ruby {...props}>{props.children}</ruby>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/s
 * @author David Schummer */
function S({...props}: ComponentPropsWithRef<"s">) {
  return <s {...props}>{props.children}</s>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/samp
 * @author David Schummer */
function Samp({...props}: ComponentPropsWithRef<"samp">) {
  return <samp {...props}>{props.children}</samp>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script
 * @author David Schummer */
function Script({...props}: ComponentPropsWithRef<"script">) {
  return <script {...props}>{props.children}</script>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search
 * @author David Schummer */
function Search({...props}: ComponentPropsWithRef<"search">) {
  return <search {...props}>{props.children}</search>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section
 * @author David Schummer */
function Section({...props}: ComponentPropsWithRef<"section">) {
  return <section {...props}>{props.children}</section>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select
 * @author David Schummer */
function Select({...props}: ComponentPropsWithRef<"select">) {
  return <select {...props}>{props.children}</select>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot
 * @author David Schummer */
function Slot({...props}: ComponentPropsWithRef<"slot">) {
  return <slot {...props}>{props.children}</slot>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/small
 * @author David Schummer */
function Small({...props}: ComponentPropsWithRef<"small">) {
  return <small {...props}>{props.children}</small>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source
 * @author David Schummer */
function Source({...props}: ComponentPropsWithRef<"source">) {
  return <source {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/span
 * @author David Schummer */
function Span({...props}: ComponentPropsWithRef<"span">) {
  return <span {...props}>{props.children}</span>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strong
 * @author David Schummer */
function Strong({...props}: ComponentPropsWithRef<"strong">) {
  return <strong {...props}>{props.children}</strong>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style
 * @author David Schummer */
function Style({...props}: ComponentPropsWithRef<"style">) {
  return <style {...props}>{props.children}</style>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/sub
 * @author David Schummer */
function Sub({...props}: ComponentPropsWithRef<"sub">) {
  return <sub {...props}>{props.children}</sub>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/summary
 * @author David Schummer */
function Summary({...props}: ComponentPropsWithRef<"summary">) {
  return <summary {...props}>{props.children}</summary>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/sub
 * @author David Schummer */
function Sup({...props}: ComponentPropsWithRef<"sup">) {
  return <sup {...props}>{props.children}</sup>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table
 * @author David Schummer */
function Table({...props}: ComponentPropsWithRef<"table">) {
  return <table {...props}>{props.children}</table>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tbody
 * @author David Schummer */
function Tbody({...props}: ComponentPropsWithRef<"tbody">) {
  return <tbody {...props}>{props.children}</tbody>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td
 * @author David Schummer */
function Td({...props}: ComponentPropsWithRef<"td">) {
  return <td {...props}>{props.children}</td>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template
 * @author David Schummer */
function Template({...props}: ComponentPropsWithRef<"template">) {
  return <template {...props}>{props.children}</template>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea
 * @author David Schummer */
function Textarea({...props}: ComponentPropsWithRef<"textarea">) {
  return <textarea {...props}>{props.children}</textarea>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tfoot
 * @author David Schummer */
function Tfoot({...props}: ComponentPropsWithRef<"tfoot">) {
  return <tfoot {...props}>{props.children}</tfoot>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th
 * @author David Schummer */
function Th({...props}: ComponentPropsWithRef<"th">) {
  return <th {...props}>{props.children}</th>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/thead
 * @author David Schummer */
function Thead({...props}: ComponentPropsWithRef<"thead">) {
  return <thead {...props}>{props.children}</thead>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time
 * @author David Schummer */
function Time({...props}: ComponentPropsWithRef<"time">) {
  return <time {...props}>{props.children}</time>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title
 * @author David Schummer */
function Title({...props}: ComponentPropsWithRef<"title">) {
  return <title {...props}>{props.children}</title>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tr
 * @author David Schummer */
function Tr({...props}: ComponentPropsWithRef<"tr">) {
  return <tr {...props}>{props.children}</tr>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track
 * @author David Schummer */
function Track({...props}: ComponentPropsWithRef<"track">) {
  return <track {...props}/>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/u
 * @author David Schummer */
function U({...props}: ComponentPropsWithRef<"u">) {
  return <u {...props}>{props.children}</u>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul
 * @author David Schummer */
function Ul({...props}: ComponentPropsWithRef<"ul">) {
  return <ul {...props}>{props.children}</ul>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/var
 * @author David Schummer */
function Var({...props}: ComponentPropsWithRef<"var">) {
  return <var {...props}>{props.children}</var>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video
 * @author David Schummer */
function Video({...props}: ComponentPropsWithRef<"video">) {
  return <video {...props}>{props.children}</video>;
}

/** @since 1.0.0
 * @category Intrinsics
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/wbr
 * @author David Schummer */
function Wbr({...props}: ComponentPropsWithRef<"wbr">) {
  return <wbr {...props}/>;
}

export type {
  TextProps
}

export {
  Text, A, Abbr, Address, Area, Article, Aside, Audio,
  B, Base, Bdi, Bdo, Blockquote, Body, Br, Button,
  Canvas, Caption, Cite, Code, Col, Colgroup,
  Data, Datalist, Dd, Del, Details, Dfn, Dialog, Div, Dl, Dt,
  Em, Embed,
  Fieldset, Figcaption, Figure, Footer, Form,
  H1, H2, H3, H4, H5, H6, Head, Header, Hgroup, Hr, Html,
  I, Iframe, Img, Input, Ins,
  Kbd,
  Label, Legend, Li, Link,
  Main, Map, Mark, Menu, Meta, Meter,
  Nav, Noscript,
  Object, Ol, Optgroup, Option, Output,
  P, Picture, Pre, Progress,
  Q,
  Rp, Rt, Ruby,
  S, Samp, Script, Search, Section, Select, Slot, Small, Source, Span, Strong, Style, Sub, Summary, Sup,
  Table, Tbody, Td, Template, Textarea, Tfoot, Th, Thead, Time, Title, Tr, Track,
  U, Ul,
  Var, Video,
  Wbr
};
