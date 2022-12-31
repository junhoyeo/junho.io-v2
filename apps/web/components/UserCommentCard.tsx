import { Card, Text, User } from '@geist-ui/core';

import { useTimeAgo } from '@/hooks/use-time-ago';

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
    <Card shadow>
      <User
        name={user.displayName}
        src={user.avatarURL}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {relativeTime}
      </User>
      <Text font="14px" p>
        {comment}
      </Text>
    </Card>
  );
};
