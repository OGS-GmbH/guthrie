import {type ComponentPropsWithRef} from "react";

type TextProps = { content: string };

function Text({content}: TextProps) {
  // oxlint-disable-next-line react/jsx-no-useless-fragment
  return <>{content}</>;
}

function A({...props}: ComponentPropsWithRef<"a">) {

  return <a {...props}>{props.children}</a>;
}

function Abbr({...props}: ComponentPropsWithRef<"abbr">) {
  return <abbr {...props}>{props.children}</abbr>;
}

function Address({...props}: ComponentPropsWithRef<"address">) {
  return <address {...props}>{props.children}</address>;
}

function Area({...props}: ComponentPropsWithRef<"area">) {
  return <area {...props}/>;
}

function Article({...props}: ComponentPropsWithRef<"article">) {
  return <article {...props}>{props.children}</article>;
}

function Aside({...props}: ComponentPropsWithRef<"aside">) {
  return <aside {...props}>{props.children}</aside>;
}

function Audio({...props}: ComponentPropsWithRef<"audio">) {
  return <audio {...props}>{props.children}</audio>;
}

function B({...props}: ComponentPropsWithRef<"b">) {
  return <b {...props}>{props.children}</b>;
}

function Base({...props}: ComponentPropsWithRef<"base">) {
  return <base {...props}/>;
}

function Bdi({...props}: ComponentPropsWithRef<"bdi">) {
  return <bdi {...props}>{props.children}</bdi>;
}

function Bdo({...props}: ComponentPropsWithRef<"bdo">) {
  return <bdo {...props}>{props.children}</bdo>;
}

function Blockquote({...props}: ComponentPropsWithRef<"blockquote">) {
  return <blockquote {...props}>{props.children}</blockquote>;
}

function Body({...props}: ComponentPropsWithRef<"body">) {
  return <body {...props}>{props.children}</body>;
}

function Br({...props}: ComponentPropsWithRef<"br">) {
  return <br {...props}/>;
}

function Button({...props}: ComponentPropsWithRef<"button">) {
  return <button {...props}>{props.children}</button>;
}

function Canvas({...props}: ComponentPropsWithRef<"canvas">) {
  return <canvas {...props}>{props.children}</canvas>;
}

function Caption({...props}: ComponentPropsWithRef<"caption">) {
  return <caption {...props}>{props.children}</caption>;
}

function Cite({...props}: ComponentPropsWithRef<"cite">) {
  return <cite {...props}>{props.children}</cite>;
}

function Code({...props}: ComponentPropsWithRef<"code">) {
  return <code {...props}>{props.children}</code>;
}

function Col({...props}: ComponentPropsWithRef<"col">) {
  return <col {...props}/>;
}

function Colgroup({...props}: ComponentPropsWithRef<"colgroup">) {
  return <colgroup {...props}>{props.children}</colgroup>;
}

function Data({...props}: ComponentPropsWithRef<"data">) {
  return <data {...props}>{props.children}</data>;
}

function Datalist({...props}: ComponentPropsWithRef<"datalist">) {
  return <datalist {...props}>{props.children}</datalist>;
}

function Dd({...props}: ComponentPropsWithRef<"dd">) {
  return <dd {...props}>{props.children}</dd>;
}

function Del({...props}: ComponentPropsWithRef<"del">) {
  return <del {...props}>{props.children}</del>;
}

function Details({...props}: ComponentPropsWithRef<"details">) {
  return <details {...props}>{props.children}</details>;
}

function Dfn({...props}: ComponentPropsWithRef<"dfn">) {
  return <dfn {...props}>{props.children}</dfn>;
}

function Dialog({...props}: ComponentPropsWithRef<"dialog">) {
  return <dialog {...props}>{props.children}</dialog>;
}

function Div({...props}: ComponentPropsWithRef<"div">) {
  return <div {...props}>{props.children}</div>;
}

function Dl({...props}: ComponentPropsWithRef<"dl">) {
  return <dl {...props}>{props.children}</dl>;
}

function Dt({...props}: ComponentPropsWithRef<"dt">) {
  return <dt {...props}>{props.children}</dt>;
}

function Em({...props}: ComponentPropsWithRef<"em">) {
  return <em {...props}>{props.children}</em>;
}

function Embed({...props}: ComponentPropsWithRef<"embed">) {
  return <embed {...props}/>;
}

function Fieldset({...props}: ComponentPropsWithRef<"fieldset">) {
  return <fieldset {...props}>{props.children}</fieldset>;
}

function Figcaption({...props}: ComponentPropsWithRef<"figcaption">) {
  return <figcaption {...props}>{props.children}</figcaption>;
}

function Figure({...props}: ComponentPropsWithRef<"figure">) {
  return <figure {...props}>{props.children}</figure>;
}

function Footer({...props}: ComponentPropsWithRef<"footer">) {
  return <footer {...props}>{props.children}</footer>;
}

function Form({...props}: ComponentPropsWithRef<"form">) {
  return <form {...props}>{props.children}</form>;
}

function H1({...props}: ComponentPropsWithRef<"h1">) {
  return <h1 {...props}>{props.children}</h1>;
}

function H2({...props}: ComponentPropsWithRef<"h2">) {
  return <h2 {...props}>{props.children}</h2>;
}

function H3({...props}: ComponentPropsWithRef<"h3">) {
  return <h3 {...props}>{props.children}</h3>;
}

function H4({...props}: ComponentPropsWithRef<"h4">) {
  return <h4 {...props}>{props.children}</h4>;
}

function H5({...props}: ComponentPropsWithRef<"h5">) {
  return <h5 {...props}>{props.children}</h5>;
}

function H6({...props}: ComponentPropsWithRef<"h6">) {
  return <h6 {...props}>{props.children}</h6>;
}

function Head({...props}: ComponentPropsWithRef<"head">) {
  return <head {...props}>{props.children}</head>;
}

function Header({...props}: ComponentPropsWithRef<"header">) {
  return <header {...props}>{props.children}</header>;
}

function Hgroup({...props}: ComponentPropsWithRef<"hgroup">) {
  return <hgroup {...props}>{props.children}</hgroup>;
}

function Hr({...props}: ComponentPropsWithRef<"hr">) {
  return <hr {...props}/>;
}

function Html({...props}: ComponentPropsWithRef<"html">) {
  return <html {...props}>{props.children}</html>;
}

function I({...props}: ComponentPropsWithRef<"i">) {
  return <i {...props}>{props.children}</i>;
}

function Iframe({...props}: ComponentPropsWithRef<"iframe">) {
  return <iframe {...props}>{props.children}</iframe>;
}

function Img({...props}: ComponentPropsWithRef<"img">) {
  return <img {...props}/>;
}

function Input({...props}: ComponentPropsWithRef<"input">) {
  return <input {...props}/>;
}

function Ins({...props}: ComponentPropsWithRef<"ins">) {
  return <ins {...props}>{props.children}</ins>;
}

function Kbd({...props}: ComponentPropsWithRef<"kbd">) {
  return <kbd {...props}>{props.children}</kbd>;
}

function Label({...props}: ComponentPropsWithRef<"label">) {
  return <label {...props}>{props.children}</label>;
}

function Legend({...props}: ComponentPropsWithRef<"legend">) {
  return <legend {...props}>{props.children}</legend>;
}

function Li({...props}: ComponentPropsWithRef<"li">) {
  return <li {...props}>{props.children}</li>;
}

function Link({...props}: ComponentPropsWithRef<"link">) {
  return <link {...props}/>;
}

function Main({...props}: ComponentPropsWithRef<"main">) {
  return <main {...props}>{props.children}</main>;
}

function Map({...props}: ComponentPropsWithRef<"map">) {
  return <map {...props}>{props.children}</map>;
}

function Mark({...props}: ComponentPropsWithRef<"mark">) {
  return <mark {...props}>{props.children}</mark>;
}

function Menu({...props}: ComponentPropsWithRef<"menu">) {
  return <menu {...props}>{props.children}</menu>;
}

function Meta({...props}: ComponentPropsWithRef<"meta">) {
  return <meta {...props}/>;
}

function Meter({...props}: ComponentPropsWithRef<"meter">) {
  return <meter {...props}>{props.children}</meter>;
}

function Nav({...props}: ComponentPropsWithRef<"nav">) {
  return <nav {...props}>{props.children}</nav>;
}

function Noscript({...props}: ComponentPropsWithRef<"noscript">) {
  return <noscript {...props}>{props.children}</noscript>;
}

function Object({...props}: ComponentPropsWithRef<"object">) {
  return <object {...props}>{props.children}</object>;
}

function Ol({...props}: ComponentPropsWithRef<"ol">) {
  return <ol {...props}>{props.children}</ol>;
}

function Optgroup({...props}: ComponentPropsWithRef<"optgroup">) {
  return <optgroup {...props}>{props.children}</optgroup>;
}

function Option({...props}: ComponentPropsWithRef<"option">) {
  return <option {...props}>{props.children}</option>;
}

function Output({...props}: ComponentPropsWithRef<"output">) {
  return <output {...props}>{props.children}</output>;
}

function P({...props}: ComponentPropsWithRef<"p">) {
  /*geile hook wenn guthrieContext.autoRegisterEvents === false*/
  return <p {...props}>{props.children}</p>;
}

function Picture({...props}: ComponentPropsWithRef<"picture">) {
  return <picture {...props}>{props.children}</picture>;
}

function Pre({...props}: ComponentPropsWithRef<"pre">) {
  return <pre {...props}>{props.children}</pre>;
}

function Progress({...props}: ComponentPropsWithRef<"progress">) {
  return <progress {...props}>{props.children}</progress>;
}

function Q({...props}: ComponentPropsWithRef<"q">) {
  return <q {...props}>{props.children}</q>;
}

function Rp({...props}: ComponentPropsWithRef<"rp">) {
  return <rp {...props}>{props.children}</rp>;
}

function Rt({...props}: ComponentPropsWithRef<"rt">) {
  return <rt {...props}>{props.children}</rt>;
}

function Ruby({...props}: ComponentPropsWithRef<"ruby">) {
  return <ruby {...props}>{props.children}</ruby>;
}

function S({...props}: ComponentPropsWithRef<"s">) {
  return <s {...props}>{props.children}</s>;
}

function Samp({...props}: ComponentPropsWithRef<"samp">) {
  return <samp {...props}>{props.children}</samp>;
}

function Script({...props}: ComponentPropsWithRef<"script">) {
  return <script {...props}>{props.children}</script>;
}

function Search({...props}: ComponentPropsWithRef<"search">) {
  return <search {...props}>{props.children}</search>;
}

function Section({...props}: ComponentPropsWithRef<"section">) {
  return <section {...props}>{props.children}</section>;
}

function Select({...props}: ComponentPropsWithRef<"select">) {
  return <select {...props}>{props.children}</select>;
}

function Slot({...props}: ComponentPropsWithRef<"slot">) {
  return <slot {...props}>{props.children}</slot>;
}

function Small({...props}: ComponentPropsWithRef<"small">) {
  return <small {...props}>{props.children}</small>;
}

function Source({...props}: ComponentPropsWithRef<"source">) {
  return <source {...props}/>;
}

function Span({...props}: ComponentPropsWithRef<"span">) {
  return <span {...props}>{props.children}</span>;
}

function Strong({...props}: ComponentPropsWithRef<"strong">) {
  return <strong {...props}>{props.children}</strong>;
}

function Style({...props}: ComponentPropsWithRef<"style">) {
  return <style {...props}>{props.children}</style>;
}

function Sub({...props}: ComponentPropsWithRef<"sub">) {
  return <sub {...props}>{props.children}</sub>;
}

function Summary({...props}: ComponentPropsWithRef<"summary">) {
  return <summary {...props}>{props.children}</summary>;
}

function Sup({...props}: ComponentPropsWithRef<"sup">) {
  return <sup {...props}>{props.children}</sup>;
}

function Table({...props}: ComponentPropsWithRef<"table">) {
  return <table {...props}>{props.children}</table>;
}

function Tbody({...props}: ComponentPropsWithRef<"tbody">) {
  return <tbody {...props}>{props.children}</tbody>;
}

function Td({...props}: ComponentPropsWithRef<"td">) {
  return <td {...props}>{props.children}</td>;
}

function Template({...props}: ComponentPropsWithRef<"template">) {
  return <template {...props}>{props.children}</template>;
}

function Textarea({...props}: ComponentPropsWithRef<"textarea">) {
  return <textarea {...props}>{props.children}</textarea>;
}

function Tfoot({...props}: ComponentPropsWithRef<"tfoot">) {
  return <tfoot {...props}>{props.children}</tfoot>;
}

function Th({...props}: ComponentPropsWithRef<"th">) {
  return <th {...props}>{props.children}</th>;
}

function Thead({...props}: ComponentPropsWithRef<"thead">) {
  return <thead {...props}>{props.children}</thead>;
}

function Time({...props}: ComponentPropsWithRef<"time">) {
  return <time {...props}>{props.children}</time>;
}

function Title({...props}: ComponentPropsWithRef<"title">) {
  return <title {...props}>{props.children}</title>;
}

function Tr({...props}: ComponentPropsWithRef<"tr">) {
  return <tr {...props}>{props.children}</tr>;
}

function Track({...props}: ComponentPropsWithRef<"track">) {
  return <track {...props}/>;
}

function U({...props}: ComponentPropsWithRef<"u">) {
  return <u {...props}>{props.children}</u>;
}

function Ul({...props}: ComponentPropsWithRef<"ul">) {
  return <ul {...props}>{props.children}</ul>;
}

function Var({...props}: ComponentPropsWithRef<"var">) {
  return <var {...props}>{props.children}</var>;
}

function Video({...props}: ComponentPropsWithRef<"video">) {
  return <video {...props}>{props.children}</video>;
}

function Wbr({...props}: ComponentPropsWithRef<"wbr">) {
  return <wbr {...props}/>;
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
