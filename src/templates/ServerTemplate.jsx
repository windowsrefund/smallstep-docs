import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Heading } from '@smallstep/step-ui';

import MDXBlock from '../components/MDXBlock';
import HBase from '../components/HBase';
import ProvisionerSelector from '../components/ProvisionerSelector';

const useStyles = makeStyles((theme) => ({
  tabPanel: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(4),
    paddingBotom: 0,
  },
}));

const ServerTemplate = ({
  doc,
  content,
  provisioner,
  deployment,
  onProvisionerChange,
  onDeploymentChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box mb={4}>
        <MDXBlock path="sections/00-intro" />
      </Box>

      <Box mb={6}>
        <HBase variant="h3">Try it</HBase>
        <HBase variant="h4">
          Create a private key and request a certificate
        </HBase>
        <MDXBlock path="sections/10-try/10-certificate" />

        <HBase variant="h4">Configure {doc.name} to use the certificate</HBase>
        <MDXBlock path="sections/10-try/20-server" />
        <HBase variant="h4">Test {doc.name} TLS configuration</HBase>
        <MDXBlock path="sections/10-try/30-test" />
      </Box>

      <Box mb={6}>
        <HBase variant="h3">Operationalize It</HBase>
        <HBase variant="h4">Configure Automated {doc.name} TLS Renewal</HBase>
        <MDXBlock path="sections/20-operationalize/10-renewal/00-intro" />
        <Box my={4}>
          <ProvisionerSelector
            provisioner={provisioner}
            onProvisionerChange={onProvisionerChange}
          />
        </Box>

        <Box mb={4}>
          <MDXBlock
            show={provisioner === 'jwk'}
            path="sections/20-operationalize/10-renewal/10-provisioner/jwk"
          />
          <MDXBlock
            show={provisioner === 'acme'}
            path="sections/20-operationalize/10-renewal/10-provisioner/acme"
          />
        </Box>

        <Tabs value={deployment} onChange={onDeploymentChange}>
          <Tab
            label="Built-In ACME"
            value="builtin"
            style={{
              display:
                provisioner === 'acme' && doc.acme ? 'inline-flex' : 'none',
            }}
          />
          <Tab label="Linux" value="linux" />
          <Tab label="Docker" value="docker" />
          <Tab label="Kubernetes" value="kubernetes" />
        </Tabs>

        <div
          className={classes.tabPanel}
          style={{ display: deployment === 'builtin' ? 'block' : 'none' }}
        >
          <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/builtin-acme" />
        </div>

        <div
          className={classes.tabPanel}
          style={{ display: deployment === 'linux' ? 'block' : 'none' }}
        >
          <MDXBlock
            show={provisioner === 'jwk'}
            path="sections/20-operationalize/10-renewal/20-deployments/linux/10-template/jwk"
          />
          <MDXBlock
            show={provisioner === 'acme'}
            path="sections/20-operationalize/10-renewal/20-deployments/linux/10-template/acme"
          />
          <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/linux/20-override" />
          <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/linux/30-enable" />
        </div>

        <div
          className={classes.tabPanel}
          style={{ display: deployment === 'docker' ? 'block' : 'none' }}
        >
          <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/docker/00-intro" />
          <MDXBlock
            show={provisioner === 'jwk'}
            path="sections/20-operationalize/10-renewal/20-deployments/docker/jwk"
          />
          <MDXBlock
            show={provisioner === 'acme'}
            path="sections/20-operationalize/10-renewal/20-deployments/docker/acme"
          />
        </div>

        <div
          className={classes.tabPanel}
          style={{
            display: deployment === 'kubernetes' ? 'block' : 'none',
          }}
        >
          <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/10-certificate" />
          <MDXBlock
            show={provisioner === 'jwk'}
            path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/20-issuer/jwk"
          />
          <MDXBlock
            show={provisioner === 'acme'}
            path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/20-issuer/acme"
          />
          <MDXBlock path="sections/20-operationalize/10-renewal/20-deployments/kubernetes/30-configuration" />
        </div>

        <HBase variant="h4">
          Distribute your root certificate to end users and systems
        </HBase>
        <MDXBlock path="sections/20-operationalize/20-root" />
      </Box>

      {content[`${doc.slug}/sections/30-research-notes/10-notes`] && (
        <Box mb={6}>
          <HBase variant="h3">Research notes</HBase>
          <MDXBlock path="sections/30-research-notes/00-intro" />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Heading variant="h5" mb={0}>
                Full research notes
              </Heading>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box width="100%" px={4}>
                <MDXBlock path="sections/30-research-notes/10-notes" />
              </Box>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Box>
      )}

      {content[`${doc.slug}/sections/40-further-reading`] && (
        <Box mb={6}>
          <HBase variant="h3">Further reading</HBase>
          <MDXBlock path="sections/40-further-reading" />
        </Box>
      )}

      <HBase variant="h3">Contribute to this document</HBase>
      <MDXBlock path="sections/50-contribute" />
    </>
  );
};

export default ServerTemplate;
