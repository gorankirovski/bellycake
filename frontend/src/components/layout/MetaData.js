import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Belly Cake`}</title>
        </Helmet>
    )
}

export default MetaData