/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
import styled from '@emotion/styled';
import { useTheme } from '@geist-ui/core';
import { format } from 'date-fns';
import { Interweave } from 'interweave';
import { MentionMatcher, UrlMatcher } from 'interweave-autolink';
import { polyfill } from 'interweave-ssr';
import Image from 'next/image';
import { useContext, useMemo } from 'react';

import { HashtagMatcher } from './HashtagMatcher';
import { TweetsContext } from './context';
import { type TweetData } from './types';
import { cleanTwitterId } from './utils';

polyfill();

/**
 * Supports plain text, images, quote tweets.
 *
 * Needs support for images, GIFs, and replies maybe?
 * Styles use !important to override Tailwind .prose inside MDX.
 */

type TweetProps = {
  tweetId: string;
  tweet?: TweetData;
  hasProfile?: boolean;
  hasMetrics?: boolean;
};
export const Tweet: React.FC<TweetProps> = ({
  tweetId: id,
  hasProfile = false,
  hasMetrics = true,
  ...props
}) => {
  const tweetId = useMemo(() => cleanTwitterId(id) || '', [id]);
  const tweetById = useContext(TweetsContext);
  const currentTweet = useMemo(
    () => tweetById[tweetId] || props.tweet,
    [props.tweet, tweetById, tweetId],
  );
  const { palette } = useTheme();

  if (!currentTweet) {
    return (
      <blockquote>
        Tweet is not available. (ID: <code>{tweetId || 'Unknown'}</code>)
      </blockquote>
    );
  }

  const {
    text,
    author,
    media,
    created_at,
    public_metrics,
    referenced_tweets,
    entities,
  } = currentTweet;

  const authorUrl = `https://twitter.com/${author.username}`;
  const likeUrl = `https://twitter.com/intent/like?tweet_id=${tweetId}`;
  const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
  const replyUrl = `https://twitter.com/intent/tweet?in_reply_to=${tweetId}`;
  const tweetUrl = `https://twitter.com/${author.username}/status/${tweetId}`;
  const createdAt = new Date(created_at);

  const formattedText = text
    .replace(/https:\/\/[\n\S]+/g, '')
    .replace('&amp;', '&');
  const quoteTweet = referenced_tweets?.find((t) => t.type === 'quoted');

  const entityURL = entities?.urls?.[0];
  const entityURLImage = entityURL?.images?.[0];
  const isEntityURLImageRectangular =
    entityURLImage?.width === entityURLImage?.height;

  return (
    <Container
      style={{
        borderColor: 'rgba(51, 51, 51, 0.65)',
        backgroundColor: palette.background,
        color: palette.foreground,
      }}
    >
      {hasProfile ? (
        <Header>
          <AuthorImageLink
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AuthorImage
              alt={author.username}
              height={256}
              width={256}
              src={author.profile_image_url.replace('normal', '400x400')}
            />
          </AuthorImageLink>
          <AuthorLink
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AuthorName title={author.name}>
              <span className="name">{author.name}</span>
              {author.verified ? (
                <VerifiedBadge
                  aria-label="Verified Account"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                  </g>
                </VerifiedBadge>
              ) : null}
              <span
                className="username"
                style={{
                  marginLeft: 6,
                  color: palette.accents_4,
                  fontWeight: 'normal',
                }}
              >
                {`@${author.username}`}
              </span>
            </AuthorName>
            <span style={{ color: palette.accents_4 }}>
              {format(createdAt, 'MMM d, yyyy')}
            </span>
          </AuthorLink>
        </Header>
      ) : (
        <Header>
          <span style={{ color: palette.accents_4 }}>
            {format(createdAt, 'MMM d, yyyy')}
          </span>
        </Header>
      )}
      <article>
        <Text
          content={formattedText}
          matchers={[
            new UrlMatcher('url'),
            new HashtagMatcher('hashtag'),
            new MentionMatcher('mention'),
          ]}
          mentionUrl="https://twitter.com/{{mention}}"
          hashtagUrl={(hashtag: string) =>
            hashtag.startsWith('$')
              ? `https://twitter.com/search?q=${hashtag}&src=cashtag_click`
              : `https://twitter.com/hashtag/${hashtag}`
          }
          newWindow
          tagName="p"
        />
      </article>
      {media?.length ? (
        <div
          style={
            media.length === 1
              ? { display: 'inline-grid', gridTemplateColumns: '1fr' }
              : { display: 'inline-grid', gridTemplateColumns: '1fr 1fr' }
          }
        >
          {media.map((m) => (
            // m.type === 'photo' ? (
            //   <Image
            //     key={m.media_key}
            //     alt={text}
            //     height={m.height}
            //     width={m.width}
            //     src={m.url}
            //     style={{
            //       objectFit: 'contain',
            //       height: 'auto',
            //       borderRadius: 8,
            //     }}
            //   />
            // ) : (
            //   <video
            //     key={m.media_key}
            //     src={m.url}
            //     style={{
            //       objectFit: 'contain',
            //       height: 'auto',
            //       borderRadius: 8,
            //     }}
            //     autoPlay
            //     muted
            //     loop
            //   />
            // ),
            <Image
              key={m.media_key}
              alt={text}
              height={m.height}
              width={m.width}
              src={m.url || m.preview_image_url || ''}
              style={{
                objectFit: 'contain',
                height: 'auto',
                borderRadius: 8,
                border: `1px solid rgba(51, 51, 51, 0.5)`,
              }}
            />
          ))}
        </div>
      ) : null}
      {!media?.length && !!entityURL && !!entityURLImage && (
        <div>
          <EntityURLContainer
            href={entityURL.expanded_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: `1px solid rgba(51, 51, 51, 0.5)`,
              ...(!isEntityURLImageRectangular
                ? { flexDirection: 'column' }
                : undefined),
            }}
          >
            <Image
              alt={entityURL.display_url}
              src={
                entityURLImage.url.includes('1592256103337062400')
                  ? 'https://www.bento.finance/assets/og-image-v2.jpg'
                  : entityURLImage.url
              }
              height={entityURLImage.height}
              width={entityURLImage.width}
              style={
                !isEntityURLImageRectangular
                  ? { objectFit: 'contain', height: 'auto' }
                  : {
                      objectFit: 'cover',
                      height: 100,
                      width: 100,
                      borderRadius: 0,
                    }
              }
            />
            <EntityURLInformation
              className={`box ${isEntityURLImageRectangular ? 'rect' : ''}`}
              style={
                !isEntityURLImageRectangular
                  ? {
                      borderTop: `1px solid rgba(51, 51, 51, 0.5)`,
                    }
                  : {
                      width: 'calc(100% - 100px)',
                      borderLeft: `1px solid rgba(51, 51, 51, 0.5)`,
                      minHeight: 100,
                      maxHeight: 100,
                    }
              }
            >
              <span className="url" style={{ color: palette.accents_4 }}>
                {entityURL.display_url}
              </span>
              <span className="title">{entityURL.title}</span>
              <span
                className="description"
                style={{
                  color: palette.accents_4,
                  ...(isEntityURLImageRectangular
                    ? {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }
                    : undefined),
                }}
              >
                {entityURL.description}
              </span>
            </EntityURLInformation>
          </EntityURLContainer>
        </div>
      )}
      <article>
        {quoteTweet ? (
          <Tweet
            tweetId={quoteTweet.id}
            tweet={{ ...quoteTweet, referenced_tweets: undefined }}
            hasProfile
            hasMetrics={false}
          />
        ) : null}
      </article>
      <div>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: palette.accents_3 }}
        >
          <time
            title={`Time Posted: ${createdAt.toUTCString()}`}
            dateTime={createdAt.toISOString()}
          >
            {format(createdAt, 'h:mm a - MMM d, y')}
          </time>
        </a>
      </div>
      {!!hasMetrics && (
        <TweetFooter style={{ color: palette.accents_3 }}>
          <FooterLink href={replyUrl} target="_blank" rel="noopener noreferrer">
            <FooterIcon width="18" height="18" viewBox="0 0 24 24">
              <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
            </FooterIcon>
            <span>
              {parseInt(public_metrics.reply_count).toLocaleString('en', {
                notation: 'compact',
              })}
            </span>
          </FooterLink>
          <FooterLink
            href={retweetUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FooterIcon width="18" height="18" viewBox="0 0 24 24">
              <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
            </FooterIcon>
            <span>
              {parseInt(public_metrics.retweet_count).toLocaleString('en', {
                notation: 'compact',
              })}
            </span>
          </FooterLink>
          <FooterLink href={likeUrl} target="_blank" rel="noopener noreferrer">
            <FooterIcon width="18" height="18" viewBox="0 0 24 24">
              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z" />
            </FooterIcon>
            <span>
              {parseInt(public_metrics.like_count).toLocaleString('en', {
                notation: 'compact',
              })}
            </span>
          </FooterLink>
        </TweetFooter>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 620px;
  width: 100%;
  height: fit-content;

  margin: 16px auto;
  padding: 16px;

  border: 1px solid;
  border-radius: 4px;

  & > *:not(article) {
    a {
      &::before,
      &::after {
        content: none;
      }
    }
  }

  img,
  a {
    -webkit-user-drag: none;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImageLink = styled.a`
  display: flex;
  height: 48px;
  width: 48px;
  color: white;
`;

const AuthorImage = styled(Image)`
  width: 48px;
  min-width: 48px;
  height: 48px;

  object-fit: contain;
  border-radius: 50% !important;
`;

const AuthorLink = styled.a`
  margin-left: 16px;
  max-width: calc(100% - 48px - 16px);

  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;

  & > span {
    width: 100%;
  }
`;

const AuthorName = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;

  .name,
  .username {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const VerifiedBadge = styled.svg`
  margin-left: 8px;
  height: 16px;
  width: 16px;
`;

const EntityURLContainer = styled.a`
  margin-bottom: 12px;
  width: 100%;

  display: flex;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    .box {
      background-color: rgba(51, 51, 51, 0.25);
    }
  }
`;
const EntityURLInformation = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: background-color 0.15s ease;

  span {
    width: 100%;
    font-size: 15px;
  }

  .url {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title,
  .description {
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &.rect {
    .title,
    .description {
      white-space: nowrap;

      display: unset;
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
    }
  }
`;

const Text = styled(Interweave)`
  margin: 16px 0 12px;
  word-break: normal !important;

  a {
    display: inline-block;
  }
`;

const TweetFooter = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;
const FooterLink = styled.a`
  display: flex;
  align-items: center;
  margin-right: 16px;
  text-decoration: none;
  color: inherit;
`;
const FooterIcon = styled.svg`
  margin-right: 8px;
  height: 16px;
  width: 16px;
  fill: currentColor;
`;
