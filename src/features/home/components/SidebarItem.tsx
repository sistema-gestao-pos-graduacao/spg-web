import React from 'react';
import { Card as S } from '../Home.style';
import { SidebarCard } from '../Home.types';
import { Themes } from '../../shared/Shared.consts';
import { StateAction } from '../../shared/Shared.types';
import { Link } from 'react-router-dom';
const SidebarItem: React.FC<{
  item: SidebarCard;
  active: boolean;
  index: number;
  setActive: StateAction<number>;
}> = ({ item, active, index, setActive }) => {
  return (
    <Link
      style={{
        opacity: item.isActive ? 1 : 0.5,
        pointerEvents: item.isActive ? 'auto' : 'none',
      }}
      to={item.route}
    >
      <S.CardContainer onClick={() => setActive(index)}>
        <S.CardIcon $active={active}>
          {React.createElement(item.icon, {
            style: {
              fill: active ? Themes.primary : Themes.light_primary,
            },
          })}
        </S.CardIcon>
        <S.CardLabel $active={active}>{item.label}</S.CardLabel>
      </S.CardContainer>
    </Link>
  );
};

export default SidebarItem;
