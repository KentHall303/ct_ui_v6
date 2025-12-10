import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface TruncatedTagListProps {
  value: string | null | undefined;
  defaultText?: string;
  maxWidth?: number;
}

export const TruncatedTagList: React.FC<TruncatedTagListProps> = ({
  value,
  defaultText = '',
  maxWidth = 150
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = React.useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = React.useState(0);
  const [allItems, setAllItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!value) {
      setAllItems([]);
      setVisibleItems([]);
      setHiddenCount(0);
      return;
    }

    const items = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    setAllItems(items);

    if (!containerRef.current || items.length === 0) {
      setVisibleItems(items);
      setHiddenCount(0);
      return;
    }

    const measureWidth = (text: string): number => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return 0;
      context.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial';
      return context.measureText(text).width;
    };

    const tagPadding = 16;
    const gapBetweenBadges = 4;
    const plusBadgeWidth = 40;
    const safetyMargin = 2;

    let currentWidth = 0;
    let visible: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const textWidth = measureWidth(items[i]);
      const itemWidth = textWidth + tagPadding;
      const gapWidth = visible.length > 0 ? gapBetweenBadges : 0;
      const remainingItems = items.length - visible.length - 1;
      const needsPlusBadge = remainingItems > 0;
      const plusBadgeSpace = needsPlusBadge ? plusBadgeWidth + gapBetweenBadges : 0;
      const totalWidth = currentWidth + gapWidth + itemWidth + plusBadgeSpace + safetyMargin;

      if (totalWidth <= maxWidth) {
        visible.push(items[i]);
        currentWidth += gapWidth + itemWidth;
      } else {
        break;
      }
    }

    if (visible.length === 0 && items.length > 0) {
      visible = [items[0]];
    }

    setVisibleItems(visible);
    setHiddenCount(items.length - visible.length);
  }, [value, maxWidth]);

  if (!value || allItems.length === 0) {
    return (
      <div className="text-dark" style={{ fontSize: '0.8125rem' }}>
        {defaultText}
      </div>
    );
  }

  const renderTooltip = (props: any) => (
    <Tooltip id="truncated-list-tooltip" {...props}>
      <div style={{ textAlign: 'left' }}>
        {allItems.join(', ')}
      </div>
    </Tooltip>
  );

  return (
    <div
      ref={containerRef}
      className="d-flex align-items-center gap-1"
      style={{
        fontSize: '0.8125rem',
        width: `${maxWidth}px`,
        maxWidth: `${maxWidth}px`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap'
      }}
    >
      {visibleItems.map((item, index) => (
        <span
          key={index}
          className="badge"
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            fontWeight: 'normal',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            flexShrink: 0
          }}
        >
          {item}
        </span>
      ))}
      {hiddenCount > 0 && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <span
            className="badge"
            style={{
              backgroundColor: '#495057',
              color: 'white',
              fontWeight: 'bold',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            +{hiddenCount}
          </span>
        </OverlayTrigger>
      )}
    </div>
  );
};
