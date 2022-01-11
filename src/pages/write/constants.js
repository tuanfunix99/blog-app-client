import Embed from "@editorjs/embed";
import Table from "editorjs-table";
import ParagraphAlignment from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "simple-image-editorjs";
import ImageGallery from "@rodrigoodhin/editorjs-image-gallery";
import Hyperlink from "editorjs-hyperlink";
import Paragraph from "@editorjs/paragraph";
import Style from "editorjs-style";
import Personality from "@editorjs/personality";
import AttachesTool from "@editorjs/attaches";
import LinkAutocomplete from "@editorjs/link-autocomplete";
import ChangeCase from "editorjs-change-case";
import Tooltip from "editorjs-tooltip";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import CodeBox from '@bomdi/codebox';

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  link: LinkTool,
  image: SimpleImage,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  imageGallery: ImageGallery,
  hyperlink: Hyperlink,
  changeCase: ChangeCase,
  codeBox: CodeBox,
};
