import { Breadcrumbs, Button, Flex, Item, View } from '@adobe/react-spectrum'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <View
        backgroundColor={'gray-50'}
        // position={'sticky'}
        top={0}
        borderBottomWidth={'thin'}
        borderBottomColor={'gray-300'}
      >
        <Flex
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Breadcrumbs>
            <Item key="home">Shuffles</Item>
          </Breadcrumbs>
          <Link to={routes[buttonTo]()}>
            <Button
              marginY={'size-100'}
              marginEnd={'size-100'}
              variant="accent"
            >
              New Shuffle
            </Button>
          </Link>
        </Flex>

        {/* <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes[titleTo]()} className="rw-link">
              {title}
            </Link>
          </h1>
          <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> {buttonLabel}
          </Link>
        </header> */}
      </View>
      <View backgroundColor={'gray-200'} padding={'size-200'}>
        <main className="rw-main">{children}</main>
      </View>
    </div>
  )
}

export default ScaffoldLayout
