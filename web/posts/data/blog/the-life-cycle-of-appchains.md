---
emoji: 💫
title: 앱체인 생애주기
slug: the-life-cycle-of-appchains
date: '2023-02-09T07:29:15.913Z'
published: false
---

## 작성중인 글입니당

이번 주제는 사실 작년부터 준비하고 있던 글감이다.

오늘 다룰 이야기는, 내가 아직까지 웹3에 1년간 풀타임으로 있으면서 + 코스모스 생태계를 관찰하면서 얻은 블록체인 세상이 움직이는 방식과, 앞으로의 움직임에 대한 내 예측을 담고있는 (레이어1에 대한 거 한정) 글이다.

### 범용 블록체인(General-purpose blockchains)이란

범용 블록체인은 다양한 응용 프로그램들이 사용할 수 있는 유연한 환경을 제공하는 블록체인을 말한다. 이러한 블록체인은 스마트 계약과 같은 복잡한 논리를 구현할 수 있는 능력을 가지고 있어, 분산 애플리케이션(DApps)의 개발과 배포에 적합하다. 기존 이더리움이나, 비트코인, 클레이튼 등이 여기에 속한다. 그러나 이런 플랫폼들은 수많은 애플리케이션을 동시에 처리하면서, 단일 트랜잭션 체인을 통해 모든 부담을 떠안게 되므로, 확장성 문제가 발생할 수 있다.

확장성 문제를 해결하기 위해 여러 대안이 제안되었다. 그중 하나는 모듈러 블록체인이다. 전통적인 모놀리틱 블록체인은 합의(컨센서스), 데이터 저장, 실행의 작업을 하나의 체인이 모두 수행하는 형태를 가진다. 이를 보완하기 위해 레이어1과 레이어2, 사이드체인 같은 개념이 도입되었다. 레이어2는 L1을 확장하는 별도의 블록체인에서 연산을 수행하고, 그 결과를 모아 주기적으로 L1에 기록하는 형태를 가지며, 이는 롤업이라고 알려져 있다. 또는 L1에서는 저장과 합의만 수행하고, 실행은 완전히 분리되어 이루어질 수 있다. 이러한 방식을 통해 보안을 위임받아 사용하는 것이 가능하다.

## 앱들은 나가고 싶어한다.

현재까지 대부분의 디앱들은 레이어 1 위에서 개발되고 있다. 이러한 앱들이 스케일을 원할 때, 그들이 처음 시작한 체인 밖을 보기 시작한다. 그렇게, 크로스 체인 확장을 선택한다. 다른 체인에 동일한 코드를 재배포하는 것이다.

하지만 이러한 크로스 체인 미래에는 몇 가지 문제가 있다.

### 체인별로 컨트랙트가 나뉘는 만큼 취약해진다.

각 체인별로 같은 디앱의 컨트랙트의 포크가 배포된다. 하지만 토큰은 하나인 상황에서, 멀티체인으로 진출할 경우 기존 체인의 토큰 allocation을 변경해야 하는 문제가 있다. 예를 들어, 기존에 존재하는 체인 A에 있는 토큰이 체인 B에도 사용되어야 할 경우, 체인 A의 토큰 allocation을 조절해야 할 필요가 생긴다. 이는 기존 체인의 토큰 구조에 변동을 주게 되므로 보안성에 취약점을 만들 수 있다.

또다른 문제는 브릿지를 사용해야 한다. 브릿지는 두 체인 간에 토큰을 전송할 수 있게 해주는 도구다. 대부분의 브릿지는 Lock & Mint 방식을 사용한다. 즉, source 체인에서 destination 체인으로 자산을 보내려면 다음과 같은 과정이 필요하다:

1. 브릿지 서비스 제공자는 source 체인과 destination 체인에 각각 vault 컨트랙트를 배포한다.
2. 유저가 source 체인 위에 있는 vault에 X토큰을 100개 보내면 입금 이벤트가 발생(emit)됨과 동시에 100X 가 동결(lock)된다.
3. 오프체인 검증인들이 vault에서 발생하는 이벤트들을 지켜보고 있다가, 입금 이벤트 발생이 확인되면 그것이 유효한지 확인한다.
4. 검증에 성공하면 destination 체인에 있는 vault에서 입금 이벤트에 커밋된 정보(수령자, 수량, 토큰)대로 Wrapped X 토큰이 100개 새로 발행된다.
5. 따라서 destination 체인에 있는 모든 (Wrapped) X 토큰의 보안은 X 토큰의 발행자와는 무관한 브릿지 서비스 제공자가 담보하는 것이다.

이 방식의 문제점은 오프체인 검증에 의존하기 때문에 검증인들이 기술적인 문제나 고의로 발행을 지연시키거나 누락시키면 피해를 입을 수 있다는 것이다. 더 나아가, 이는 굉장히 위험한 상황을 만들 수 있다. 만약 브릿지 서비스가 해킹당하거나, 검증인들이 악의적으로 compromised되어서 Wrapped X 토큰을 엄청나게 많이 찍어버리면 destination 체인 위의 생태계가 망가질 수 있다.

### 레이어 1 의존성이 엄청나게 강해진다.

또다른 문제는 애플리케이션이 블록체인 플랫폼에 강한 의존성을 가지게 된다는 것이다. 플랫폼(체인)이나 재단에서 경영 문제가 생기거나 네이티브 토큰의 가격이 급락하면 앱 역시 큰 타격을 입게 된다. 유동성 풀도 거기에 있을거고, 대부분 네이티브 토큰과 함께 페어링되는 경우가 많으니까.

예로 클레이튼 위에서 운영되는 DEX Aggregator인 스왑스캐너를 살펴보자.
스왑스캐너의 토큰인 SCNR 역시 대부분의 유동성이 클레이튼의 네이티브 토큰인 클레이(KLAY)와 페어 예치되어 있기 때문에, 토큰 가격이 직접적인 영향을 받았다.
이들은 최근 GC로 합류하여 활발하게 활동하고 있는데 그 이유도 그렇다.

### 레이어 1에 가치를 뺏긴다.

앱이 자신의 가치를 블록체인 플랫폼에 계속해서 빼앗기는 상황이다. 스왑스캐너 역시 체인 전체에서 발생하는 토큰 거래의 50.93%가 스왑스캐너에서 이루어진다. 물론 이들은 거래가 발생할 때마다 수수료를 얻게 되지만, 트랜잭션 수수료는 클레이튼이 받게 된다.

그리고 새로운 레이어 1 체인들이 계속해서 등장하고 있다. 이에 따라 앱들도 많이 출시되고 있다. 하지만 실제로 우수한 앱들은 소수일 뿐이며, 대부분은 이미 성공한 기존 앱들을 포크하여 가져오는 경우가 많다.
이런 상황에서 점점 특정 체인을 사용하는 이유는 몇몇 대단한 앱을 사용하기 위한 것이 된다. (유니스왑, 오픈씨, 스왑스캐너 점유율 차트 참조) 앱이 사용자 니즈를 충족시키지만, 그 결과로 생긴 부가가치는 체인이 가져간다. 이런 상황을 원치 않는 것이다.

이들은 자체적인 주권을 확보하려 하며, 수평적인 성장보다는 수직적인 성장을 추구하게 될거다.

## 코스모스의 앱체인 가설

그래서 등장한 것이 '블록체인의 인터넷'이라는 표어를 걸고 나타난 코스모스다. 코스모스는 서로 다른 블록체인들이 상호작용할 수 있는 구조를 만드는 것을 목표로 하고 있다.

코스모스 생태계에서는 IBC(Inter-Blockchain Communication)를 사용하여 인터체인 간의 통신이 가능하다. 이를 통해 서로 다른 블록체인들이 상호작용이 가능하며, 이렇게 연결된 체인들은 동등한 주권을 가지게 된다. 이는 말 그대로 체인들이 효과적으로 서로 대화를 나눌 수 있게 한다는 의미다.

코스모스의 특징적인 점은 기존 L1(레이어 1)에 프로토콜들이 추가되는 것이 아니라, 특정 앱에 특화된 여러 개의 L1들, 즉 앱체인이 등장하며 이들이 서로 상호 운용되는 구조를 가진다는 점이다. 각 앱의 요구사항에 맞게 체인이 특화되어 있어, 예를 들어 오스모시스(Osmosis)는 DEX(Decentralized Exchange, 탈중앙화 거래소) 앱체인으로서, 유동성 풀을 다루는 native queries/methods를 제공한다.

앱체인 가설(AppChain Thesis)은 기존의 L1을 여러 프로토콜이나 경제 활동을 지원하도록 확장하는 대신, 각 프로토콜에 맞춤화된 여러 L1을 출시하고 이들을 연결하는 전략을 의미한다.

## 💡 새로운 체인을 만들기는 점차 쉬워질 것이다.

Cosmos 중심으로만 보면:

- 개발 인프라> Cosmos SDK, Ignite, Terra Feather 등
- Security Sharing Models> ICS(Interchain Security), Mesh Security,Terra Alliance
- Interchain Tech> IBC + ICQ + ICA (feat. Neutron)
- 아직까지의 L1들은 general purpose 한데 점차 이렇게 분리되어 나가면 이들끼린 분명한 강점을 제공해줘야 할 것
- 결국 이들은, 각각의 L1의 핵심 차별점을 활용하는 Core App을 만들거나, 이미 생태계에 존재하는 dominant한 앱을 인수하는 등, 체인과 결합도를 높이는 방법으로 앱체인에 점차 가까워질 거다.

## 💡 점차 레이어1 체인들의 성능은 비슷비슷해지고, 체인 간 경계는 허물어지고 있다.

차별점이 줄어든다고 해야하나.

- 메인넷의 성능으로 경쟁 - TPS, Finality로 승부할 수 있는- 시대는 금방 지나갈 것.
- 오픈소스기 때문에 포크하면 되는거고, 이미 오픈소스는 모두 모듈화 되어있고 논문들도 나와있다. Instant finality를 원하거나, PoW를 원한다면 해당 컨센서스를 이식하면 되고~
- 그리고 이제 다들 사용자 경험에 점점 신경쓰고 있고, 앞으로는 더더욱 그럴거니까, 인프라에서 보장해주는게 많을거다.

그리고, 블록체인 간 경계는 점점 허물어지고 있다.

지금이야 사람들은 서로 다른 네트워크의 디앱을 사용하기 위해, MetaMask에서 네트워크 변경 버튼을 누르고, 자산을 옮기기 위해 CEX를 경유하거나, 브릿지를 사용하지만, 머지않아 새로 온보딩되는 유저들은 그럴 필요를 느끼지도 못할 것이다. 인프라가 계속 발전하고 있기 때문이다.

## 🌖 테라(Terra)는 앱체인이였다.

방금 이야기한 것의 예시는 테라(Terra) 블록체인의 **앵커 프로토콜(Anchor Protocol)** 을 보면 알 수 있다.

앵커는 테라에서, 아니 web3 전체에서 가장 핫햇던 DApp들 중 하나였을 것이다.
테라의 UST가 메이커다오(MakerDAO)의 다이(DAI)를 넘볼 수 있을 정도로 성장할 수 있었던 것도 앵커 덕분이다.

<Tweet tweetId="1506494471873081352" hasProfile />

### 킬러앱 앵커(Anchor)

> [킬러 애플리케이션](https://ko.wikipedia.org/wiki/%ED%82%AC%EB%9F%AC_%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98)이란 주로 컴퓨터 프로그래밍 소프트웨어 제품 중에 그 인기나 유용성이 아주 높아서 **그 제품을 사용하기 위해서 필요한 하드웨어나 운영체제 등의 플랫폼까지도 구매하게 만들 정도로** 인기와 수요가 높은 응용 프로그램 제품을 말한다. 줄여서 킬러앱으로 부르기도 한다. (위키백과)

디젠들은 앵커를 **킬러앱**으로 회자한다. 그 이유는 무엇일까?

- 앵커는 **달러(UST 스테이블코인)을 맡기면 약 19.5%의 복리 이자를 주는**, 직관적인 서비스를 제공했다(물론 이들이 내건 고정 이자는 지속가능하지 않았고, 이것은 곧 테라 디페깅 사태로 이어졌지만).
- 여기에는 어떠한 락업도 없었다. 사람들은 원할 때 돈을 넣고, 돈이 다시 필요할 때 불어나 있는 돈을 빼면 되었다.
- **그 결과 수많은 사람들이 테라 블록체인으로 유입되었다.** 크립토 세상에 앵커로 처음 발을 들인 사람들도 많았다. 사람들은 테라 블록체인 전용 지갑(Terra Station)을 설치했고, 지갑을 생성한 뒤, UST를 구매(한 뒤 입금)했고, UST(또는 LUNA)로 수수료를 지급했다.
- [xAnchor](https://docs.anchorprotocol.com/anchor-2/xanchor/xanchor)와 [EthAnchor](https://docs.anchorprotocol.com/anchor-2/developers-ethereum/ethanchor)를 통해서 이더리움, 아발란체 등의 다른 블록체인들에서도 (다른 지갑 앱을 설치하거나 네트워크를 변경한 뒤, 테라 블록체인 위로 자산을 옮기지 않아도) 바로 앵커를 사용할 수 있었다. 타 블록체인에 존재하는 가치를 테라로 옮겨올 수 있던 것이다.

이렇게 앵커를 통해 많은 유저들이 유입되었음에도 불구하고, 이들은 처음에 Terra의 다른 디앱들을 사용할 일이 없었다. 이유는 다음과 같다:

1. UST는 바이낸스 등 대부분의 메이저 거래소에 상장되어 있었기 때문에, DEX나 브릿지 등을 이용할 이유가 크게 없었다.
2. USD는 네이티브 토큰이기 때문에, 블록체인 위에서 수수료를 지불하는 데 사용할 수 있었다. 유저들은 LUNA를 굳이 구비할 이유가 없었다.
3. 앵커가 가장 매력적인 투자 상품을 제안했기 때문이다. 리스크를 안고 다른 디파이 프로토콜을 사용하는 것보다 달러를 얌전히 예치하고 20% 이자를 받는 것이 더 수익성이 좋았다.

### 대부분의 유저들에게 테라는 앵커를 위한 앱체인이였다.

앵커가 있을 때 외부에서 유입된 사람들이 테라 블록체인과 상호 작용하는 플로우는 다음과 같았다:

1. 먼저, **UST를 매수해서 테라 블록체인으로** 가져온다.

- 바이낸스에서 UST를 매수한 뒤, 개인 지갑으로 출금한다.
- 또는, DEX 앱체인인 오스모시스에서 다른 블록체인의 토큰을 UST로 스왑하고, IBC를 통해 테라 블록체인으로 가져온다.
- 이더리움 등의 다른 블록체인에서 다른 토큰을 Wrapped UST로 스왑하고, 이것을 브릿지의 한 종류인 웜홀(Wormhole)을 통해 테라 블록체인으로 가져온다.

2. 가져온 UST를 앵커에 예치한다.
3. 이후 **UST를 출금한 뒤, 다른 체인이나 CEX로 보내** 현금화하거나 다른 자산을 구입한다.

이들에게 테라와 앵커는 한 덩어리, 같은 것이였다. 앵커를 사용하기 위해서 테라 블록체인이 존재하는 것 뿐, 다른 의미가 없었다.
즉 나는 테라는 앵커 중심의 앱체인이라고 생각한다.

## 💡 허브란?

코스모스에는 허브(Hub)라는 개념이 있다.

이런글도 있다 https://polkachu.com/blogs/hub-wars

코스모스 네트워크에서 "허브"는 몇 가지 중요한 기능을 수행하며, 이 역할은 다양한 관점에서 볼 수 있습니다:

IBC 커넥션의 중심: 허브는 Inter-Blockchain Communication (IBC) 연결의 중심점 역할을 합니다. 이는 IBC 연결이 권한 없이 생성될 수 있지만, 소규모 체인들은 서로 직접 연결하는데 크게 관심을 두지 않기 때문입니다. 결과적으로 IBC 네트워크 토폴로지는 자연스럽게 허브-스포크 모델로 진화하며, 일부 체인들은 중심에 위치하고 다른 체인들은 외곽에 위치하게 됩니다​1​.

자산의 홈베이스 + 유저가 첫번째로 거치는곳: 허브는 자산의 "홈베이스" 역할을 합니다. 인터체인에 다양한 토큰을 가진 사용자들은 일반적으로 자산을 보관하고, 유동성을 제공하고, 대출 및 차입하며, 가치를 이전 또는 교환하고, 피아트 통화와 상호 작용하는 홈베이스를 가지고 있습니다. 더불어, 허브는 종종 지갑으로 표현되며, 이는 사용자가 인터체인과 상호 작용하는 첫 번째 어플리케이션이 됩니다​1​.

보안 제공자: 허브는 다른 체인들에게 보안을 제공할 수 있습니다. 각 체인은 자체 검증자 세트와 스테이킹 토큰으로 자유롭게 보안을 유지할 수 있지만, 처음부터 고도로 보안된 체인을 부트스트랩하는 것은 어려울 수 있습니다. 따라서 일부 체인들은 고가의 체인, 즉 허브로부터 보안을 "빌리는" 것을 선호합니다. 이런 방식으로, 허브는 네트워크 내의 다른 체인들에게 보안 제공자로서의 역할을 합니다​1.

얼마전까지 Cosmos Hub와 Osmosis가 허브자리를 놓고 싸우고 있었다 지금은 근데 엄청난 베어라 멈춘듯 ㅋㅋ

## 💡 기존 L1들은 코어앱 중심의 앱체인으로, 앱체인들은 실험장으로.

누구나 레이어1 체인을 만들 수 있고, 레이어1 체인들끼리의 차별점이 갈수록 줄어드는 요즘, 이제 중요한 건 Core App이지 Mainnet이 아니다.

- L1들의 목표는 수수료(protocol로 인해 발생하는 fee 기회 온전히 흡수. 이걸 탐하면서 자체 앱체인), 그들만의 체인 네이티브한 주권.
- Anchor 중심의 생태계가 생성됨. Pylon, Glow, Suberra 등의 프로토콜들은 Terra에서 빌딩되며 Anchor의 머니레고를 consume함.
- 이런 프로토콜들이 자체 앱체인(zone)으로 나중에 분가한다면, 그때도 Anchor AppChain(=Terra)와의 연결이 필요해질 것.

  - 그러면 굳이 다른 Hub를 경유하지 않고, 바로 Anchor와 연결될 것.
  - 즉 Anchor AppChain은 자연스럽게 Hub가 된다.

그래서 AppChain을 Hub로 만드는 것은 프로토콜을 얼마나 잘 키우느냐다.

이 글은 쓴 지 좀 되었는데 그동안 이미 Terra (+Osmosis)에는 Mars Protocol 이라는 사례가 생겼다.
이 변화를 바로 근접한 곳에서 지켜보며, 나만의 Thesis가 세워졌다.

+앱체인도 결국 앱에 집중은 하겠지만 여기서 충분히 사이즈가 커지면 모놀리틱 하게 가고자할거(인간본성). 이 과정에서 갈등도 발생. 이때 명분은 코어앱중심 편한 환경이고. 예를 들어 오스소미스와 ICNS vs Stargaze 등.

## 📌 TL;DR (전망 요약)

1. 앞으로 앱체인의 형태로, 즉 새로운 L1의 형태로 빌딩되는 프로토콜은 늘어날 거다.
2. 초반 체인을 만들 기술과 명분이 부족한 프로토콜들은 먼저 코어앱을 중심으로 하는 생태계에 들어가고 싶어할 것이다.
3. 기존 모놀리틱 L1들은 코어앱을 중심으로 앱체인에 가까워질 것이다.

- 머니레고 or 유저 획득(기존 커뮤니티에서 에어드랍하며 시작 등)
- 코어앱과 체인의 결합이 강할수록, permissionized 될거다. 검증된 앱, 코어앱과 연결되는 앱만 받겠다는 의지.

4. 코어앱이 충분히 검증된 L1들은, 그렇게 만들어진 프로토콜들을 위한 실험장이 될거다.
5. 실험장에서 PMF를 달성한 앱들은, 다시 새로운 앱체인의 형태로 분가할 것이다.
6. 이때 “부모” L1의 코어앱이 충분히 강력하다면, “자식” 앱체인은 생태계의 기존 Hub나 인프라를 경유하는 대신 부모앱에 바로 연결되는 것도 고려할 것이다.
7. 이렇게 “부모” 앱체인은 “자식” 앱체인들로 인해 Hub가 되어간다.

이걸 AppChain 생애주기 가설 (**Thesis: The Life Cycle of AppChains**) 이라고 부르겠다.
