"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _router = require("../utils/router");

var _icon = _interopRequireDefault(require("../icon"));

var _loading = _interopRequireDefault(require("../loading"));

var _createNamespace = (0, _utils.createNamespace)('button'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Button(h, props, slots, ctx) {
  var tag = props.tag,
      icon = props.icon,
      type = props.type,
      disabled = props.disabled,
      loading = props.loading,
      hairline = props.hairline,
      loadingText = props.loadingText;

  function onClick(event) {
    if (!loading && !disabled) {
      (0, _functional.emit)(ctx, 'click', event);
      (0, _router.functionalRoute)(ctx);
    }
  }

  function onTouchstart(event) {
    (0, _functional.emit)(ctx, 'touchstart', event);
  }

  var classes = [bem([type, props.size, {
    disabled: disabled,
    hairline: hairline,
    block: props.block,
    plain: props.plain,
    round: props.round,
    square: props.square
  }]), {
    'van-hairline--surround': hairline
  }];

  function Content() {
    var content = [];

    if (loading) {
      content.push(h(_loading.default, {
        "class": bem('loading'),
        "attrs": {
          "size": props.loadingSize,
          "type": props.loadingType,
          "color": type === 'default' ? undefined : ''
        }
      }));
    } else if (icon) {
      content.push(h(_icon.default, {
        "attrs": {
          "name": icon
        },
        "class": bem('icon')
      }));
    }

    var text;

    if (loading) {
      text = loadingText;
    } else {
      text = slots.default ? slots.default() : props.text;
    }

    if (text) {
      content.push(h("span", {
        "class": bem('text')
      }, [text]));
    }

    return content;
  }

  return h(tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": classes,
    "attrs": {
      "type": props.nativeType,
      "disabled": disabled
    },
    "on": {
      "click": onClick,
      "touchstart": onTouchstart
    }
  }, (0, _functional.inherit)(ctx)]), [Content()]);
}

Button.props = (0, _extends2.default)({}, _router.routeProps, {
  text: String,
  icon: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  nativeType: String,
  loadingText: String,
  loadingType: String,
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  loadingSize: {
    type: String,
    default: '20px'
  }
});

var _default = createComponent(Button);

exports.default = _default;