import React from 'react';
import { Space, Typography } from 'antd';
import { useIntl } from 'umi';
const { Text, Link } = Typography;

// 字体颜色
const fontColorMapping = ['', 'rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 0.65)', 'rgba(0, 0, 0, 0.45)'];

// 高亮显示关键词
/**
 *
 * @param text 翻译字串
 * @param keyword 被高亮的关键词
 * @param isAll 首次高亮还是可以重复高亮
 * @param hightLightColor 高亮颜色
 * @param textColor 翻译字体颜色
 * @returns
 */
export function highLightText({ text, keyword, isAll, hightLightColor = '#2a68bf' }) {
  if (!text || !keyword) {
    return [];
  }

  if (!text.includes(keyword)) {
    return [text];
  }

  const locations: any[] = [];
  text?.replace(new RegExp(keyword, 'gi'), (match, locate, string) => {
    locations.push(locate);
  });

  if (!isAll) {
    const validLocation = locations?.[0];
    let replacedText: any;
    const keywordInText = text.slice(validLocation, validLocation + keyword?.length);
    if (keyword === text) {
      replacedText = [<Text style={{ color: hightLightColor }}>{keywordInText}</Text>];
    } else if (validLocation === 0) {
      replacedText = [
        <Text style={{ color: hightLightColor }}>{keywordInText}</Text>,
        text?.slice(keyword?.length),
      ];
    } else if (validLocation === text.length - 1) {
      replacedText = [
        text?.slice(0, validLocation),
        <Text style={{ color: hightLightColor }}>{keywordInText}</Text>,
      ];
    } else {
      replacedText = [
        text?.slice(0, validLocation),
        <Text style={{ color: hightLightColor }}>{keywordInText}</Text>,
        text?.slice(validLocation + keyword?.length),
      ];
    }

    return replacedText;
  } else {
    let replacedText: any[] = [];
    locations?.map((locate, i) => {
      let currenText = '';
      const keywordInText = text?.slice(locate, locate + keyword?.length);
      if (locate === 0) {
        currenText = keywordInText;
      } else {
        if (i === 0) {
          currenText = text?.slice(0, locate) + keywordInText;
        } else {
          currenText = text?.slice(locations?.[i - 1] + keyword?.length, locate) + keywordInText;
        }
      }
      replacedText = replacedText.concat(
        highLightText({ text: currenText, keyword, isAll: false, hightLightColor }),
      );
    });
    const lastKeywordLocation = locations?.[locations?.length - 1] + keyword?.length;
    if (lastKeywordLocation < text?.length) {
      replacedText.push(text.slice(lastKeywordLocation));
    }
    return replacedText;
  }
}

/**
 * 高亮显示翻译中的词汇（主要场景是数字）
 * @param id, values, defaultMessage等参数是翻译组件自带
 * @param keyword string[]  自定义的高亮关键词集合，如无则使用翻译参数，均无则不高亮
 * @param hightLightColor 自定义高亮的颜色，默认health色
 * @param textColorLevel  翻译字体颜色level, 1,2,3
 * @returns
 */
export default ({
  id,
  values,
  defaultMessage,
  keywords = [],
  hightLightColor = '#2a68bf',
  textColorLevel = 1,
}) => {
  const intl = useIntl();
  const translation = intl.formatMessage({ id, defaultMessage }, values);
  const highLightWord = !keywords?.length ? Object.values(values) : keywords;
  const textColor = fontColorMapping?.[textColorLevel];
  if (!highLightWord?.length) {
    return <>{translation}</>;
  }

  let replacedText = [];
  highLightWord.forEach((v) => {
    if (!replacedText?.length) {
      replacedText = highLightText({
        text: translation,
        keyword: String(v),
        isAll: true,
        hightLightColor,
      });
    } else {
      let newText = [];
      replacedText.forEach((m) => {
        if (typeof m === 'string') {
          newText = newText.concat(
            highLightText({ text: m, keyword: String(v), isAll: false, hightLightColor }),
          );
        } else {
          newText.push(m);
        }
      });
      replacedText = newText;
    }
  });
  return (
    <Space>
      {replacedText.map((v, i) => {
        return (
          <Text key={`${i}`} style={{ color: textColor }}>
            {v}
          </Text>
        );
      })}
    </Space>
  );
};
