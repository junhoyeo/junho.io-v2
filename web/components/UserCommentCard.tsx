import styled from '@emotion/styled';
import { useTimeAgo } from '@/hooks/use-time-ago';
import { colors } from '@/styles/colors';

export type UserComment = {
  uuid: string;
  user: {
    displayName: string;
    avatarURL: string;
  };
  comment: string;
  createdAt: Date;
  position: {
    x: number;
    y: number;
    xpath: string;
  };
};

type UserCommentCardProps = UserComment;

export const UserCommentCard: React.FC<UserCommentCardProps> = ({
  user,
  comment,
  createdAt,
}) => {
  const relativeTime = useTimeAgo(createdAt);
  return (
    <CommentCard>
      <UserInfo>
        <Avatar src={user.avatarURL} alt={user.displayName} />
        <UserDetails>
          <UserName>{user.displayName}</UserName>
          <TimeAgo>{relativeTime}</TimeAgo>
        </UserDetails>
      </UserInfo>
      <CommentText>{comment}</CommentText>
    </CommentCard>
  );
};

const CommentCard = styled.div`
  padding: 16px;
  background-color: ${colors.accents_1};
  border: 1px solid ${colors.accents_2};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  color: ${colors.foreground};
  font-size: 14px;
`;

const TimeAgo = styled.span`
  color: ${colors.accents_5};
  font-size: 12px;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.accents_7};
  line-height: 1.5;
`;
